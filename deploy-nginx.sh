#!/bin/bash

# Nginx Deployment Script for Monlam Font Viewer
# This script sets up nginx as a reverse proxy for the Next.js application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Setting up Nginx for Monlam Font Viewer${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

# Check if nginx is installed
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}Installing nginx...${NC}"
    if command -v apt-get &> /dev/null; then
        apt-get update
        apt-get install -y nginx
    elif command -v yum &> /dev/null; then
        yum install -y nginx
    elif command -v dnf &> /dev/null; then
        dnf install -y nginx
    else
        echo -e "${RED}Package manager not supported. Please install nginx manually.${NC}"
        exit 1
    fi
fi

# Create nginx configuration directory
NGINX_CONF_DIR="/etc/nginx/sites-available"
NGINX_ENABLED_DIR="/etc/nginx/sites-enabled"

if [ ! -d "$NGINX_CONF_DIR" ]; then
    mkdir -p "$NGINX_CONF_DIR"
fi

if [ ! -d "$NGINX_ENABLED_DIR" ]; then
    mkdir -p "$NGINX_ENABLED_DIR"
fi

# Copy nginx configuration
echo -e "${YELLOW}Configuring nginx...${NC}"
cp nginx.conf "$NGINX_CONF_DIR/monlam-font-viewer"
ln -sf "$NGINX_CONF_DIR/monlam-font-viewer" "$NGINX_ENABLED_DIR/monlam-font-viewer"

# Create font directory
FONT_DIR="/var/www/monlam-font-viewer/public/fonts"
mkdir -p "$FONT_DIR"
cp -r public/fonts/* "$FONT_DIR/"

# Set proper permissions
chown -R www-data:www-data "$FONT_DIR"
chmod -R 755 "$FONT_DIR"

# Test nginx configuration
echo -e "${YELLOW}Testing nginx configuration...${NC}"
nginx -t

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Nginx configuration is valid${NC}"
    
    # Reload nginx
    systemctl reload nginx
    systemctl enable nginx
    
    echo -e "${GREEN}✅ Nginx has been configured and reloaded${NC}"
    echo -e "${YELLOW}📝 Next steps:${NC}"
    echo "1. Update SSL certificates in nginx.conf"
    echo "2. Start your Next.js application on port 3000"
    echo "3. Access your app at http://your-domain.com or https://your-domain.com"
    echo ""
    echo -e "${GREEN}🎉 Nginx setup complete!${NC}"
else
    echo -e "${RED}❌ Nginx configuration test failed${NC}"
    exit 1
fi
