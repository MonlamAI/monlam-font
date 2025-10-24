# 🌐 Nginx Deployment Guide - Monlam Font Viewer

This guide explains how to deploy the Monlam Font Viewer with nginx as a reverse proxy, handling both HTTP and HTTPS traffic.

## 📋 Prerequisites

- Ubuntu/Debian server (or similar Linux distribution)
- Docker and Docker Compose installed
- Domain name (for HTTPS)
- SSL certificates (for HTTPS)

## 🚀 Quick Start

### Option 1: Automated Setup

```bash
# Run the automated deployment script
sudo ./deploy-nginx.sh
```

### Option 2: Manual Setup

```bash
# 1. Install nginx
sudo apt update && sudo apt install nginx

# 2. Copy configuration
sudo cp nginx.conf /etc/nginx/sites-available/monlam-font-viewer
sudo ln -s /etc/nginx/sites-available/monlam-font-viewer /etc/nginx/sites-enabled/

# 3. Create font directory
sudo mkdir -p /var/www/monlam-font-viewer/public/fonts
sudo cp -r public/fonts/* /var/www/monlam-font-viewer/public/fonts/
sudo chown -R www-data:www-data /var/www/monlam-font-viewer/
sudo chmod -R 755 /var/www/monlam-font-viewer/

# 4. Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

## 🐳 Docker Deployment

### Production (with HTTPS)

```bash
# Start with nginx and SSL
docker-compose -f docker-compose-nginx.yml up -d
```

### Development (HTTP only)

```bash
# Start development environment
docker-compose -f docker-compose-dev.yml up -d
```

## 🔧 Configuration Files

### `nginx.conf` - Production Configuration

- **HTTPS**: Redirects HTTP to HTTPS
- **SSL**: Secure SSL/TLS configuration
- **Security**: Security headers and rate limiting
- **Performance**: Gzip compression and caching
- **Fonts**: Direct serving with long cache

### `nginx-dev.conf` - Development Configuration

- **HTTP**: Allows HTTP traffic for development
- **Caching**: Shorter cache times for development
- **Debugging**: Easier to debug without SSL

## 🔒 SSL Certificate Setup

### Option 1: Let's Encrypt (Recommended)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Option 2: Manual Certificate

```bash
# Update nginx.conf with your certificate paths:
# ssl_certificate /path/to/your/certificate.crt;
# ssl_certificate_key /path/to/your/private.key;
```

## 📊 Features

### 🛡️ Security

- **Rate Limiting**: API and admin routes protected
- **Security Headers**: XSS, CSRF, and clickjacking protection
- **SSL/TLS**: Modern encryption protocols
- **File Upload**: Size limits and validation

### ⚡ Performance

- **Gzip Compression**: Reduces bandwidth usage
- **Font Caching**: Long-term caching for fonts
- **Static Assets**: Optimized serving of static files
- **Load Balancing**: Ready for multiple app instances

### 🔧 Monitoring

- **Health Checks**: Built-in health monitoring
- **Logging**: Access and error logging
- **Metrics**: Request tracking and analysis

## 🌐 Port Configuration

### Default Ports

- **HTTP**: Port 80 (redirects to HTTPS)
- **HTTPS**: Port 443 (main application)
- **Next.js**: Port 3000 (internal)

### Custom Ports

To use different ports, update the nginx configuration:

```nginx
# For custom HTTP port
server {
    listen 8080;
    # ... rest of configuration
}

# For custom HTTPS port
server {
    listen 8443 ssl;
    # ... rest of configuration
}
```

## 🔄 Environment Variables

Create `.env` file for Docker Compose:

```bash
# Admin credentials
ADMIN_USERNAME=your_secure_username
ADMIN_PASSWORD=your_secure_password

# Application settings
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_DEBUG=false
```

## 📝 Deployment Checklist

### ✅ Pre-Deployment

- [ ] Domain name configured
- [ ] SSL certificates ready
- [ ] Server resources allocated
- [ ] Environment variables set

### ✅ Deployment

- [ ] Nginx configuration copied
- [ ] SSL certificates installed
- [ ] Font files copied to nginx directory
- [ ] Next.js application running on port 3000
- [ ] Nginx configuration tested
- [ ] Services started and enabled

### ✅ Post-Deployment

- [ ] HTTP redirects to HTTPS
- [ ] Fonts load correctly
- [ ] Admin panel accessible
- [ ] File upload works
- [ ] Health check responds
- [ ] Performance is acceptable

## 🐛 Troubleshooting

### Common Issues

#### 1. **502 Bad Gateway**

```bash
# Check if Next.js app is running
curl http://localhost:3000/api/health

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
```

#### 2. **Fonts Not Loading**

```bash
# Check font directory permissions
ls -la /var/www/monlam-font-viewer/public/fonts/

# Fix permissions if needed
sudo chown -R www-data:www-data /var/www/monlam-font-viewer/
```

#### 3. **SSL Certificate Issues**

```bash
# Test SSL configuration
sudo nginx -t

# Check certificate validity
openssl x509 -in /path/to/certificate.crt -text -noout
```

#### 4. **Rate Limiting Too Strict**

```nginx
# Adjust rate limits in nginx.conf
limit_req_zone $binary_remote_addr zone=api:10m rate=20r/s;
```

### Useful Commands

```bash
# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Check nginx status
sudo systemctl status nginx

# View nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Check port usage
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
```

## 📈 Performance Optimization

### 1. **Enable HTTP/2**

```nginx
listen 443 ssl http2;
```

### 2. **Optimize Caching**

```nginx
# Font files
expires 1y;
add_header Cache-Control "public, immutable";

# Static assets
expires 1y;
add_header Cache-Control "public, immutable";
```

### 3. **Enable Gzip**

```nginx
gzip on;
gzip_comp_level 6;
gzip_types text/plain text/css application/json application/javascript;
```

## 🔐 Security Best Practices

### 1. **Update SSL Configuration**

```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
```

### 2. **Security Headers**

```nginx
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
```

### 3. **Rate Limiting**

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=admin:10m rate=5r/s;
```

## 🎉 Success!

Your Monlam Font Viewer is now running behind nginx with:

- ✅ **HTTPS Security**: SSL/TLS encryption
- ✅ **Performance**: Gzip compression and caching
- ✅ **Security**: Rate limiting and security headers
- ✅ **Monitoring**: Health checks and logging
- ✅ **Scalability**: Ready for load balancing

**Access your application at:**

- **HTTPS**: `https://your-domain.com`
- **HTTP**: `http://your-domain.com` (redirects to HTTPS)

---

**Need help?** Check the logs and troubleshooting section above! 🚀
