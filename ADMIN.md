# 🔐 Admin Panel - Monlam Font Viewer

## Overview

The admin panel provides secure access to upload and manage Monlam fonts for the Monlam Font Viewer application.

## Features

### 🔑 Authentication

- **Secure Login**: Username/password authentication
- **Session Management**: 24-hour session tokens
- **Auto-logout**: Automatic session expiration
- **Protected Routes**: All admin routes require authentication

### 📁 Font Management

- **Upload Fonts**: Upload .ttf and .otf font files
- **File Validation**: Type and size validation (max 10MB)
- **Font Preview**: View all current fonts in the system
- **Category Management**: Organize fonts by category

## Access

### Default Credentials

- **Username**: `admin`
- **Password**: `monlam2024`

### Environment Variables

Create a `.env.local` file with custom credentials:

```bash
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

## Usage

### 1. Access Admin Panel

1. Visit `/admin/login` or click the "Admin" button on the main page
2. Enter your credentials
3. You'll be redirected to the dashboard

### 2. Upload New Fonts

1. In the dashboard, use the "Upload New Font" section
2. Select a .ttf or .otf font file
3. The font will be automatically uploaded to `/public/fonts/`
4. The font will appear in the font viewer immediately

### 3. Manage Fonts

- View all current fonts in the dashboard
- See font categories and filenames
- Monitor upload status and errors

## Security Features

### 🔒 Authentication Security

- **Session-based**: Secure session tokens
- **HTTP-only Cookies**: Prevents XSS attacks
- **CSRF Protection**: SameSite cookie policy
- **Session Expiration**: Automatic logout after 24 hours

### 🛡️ Upload Security

- **File Type Validation**: Only .ttf and .otf files allowed
- **Size Limits**: Maximum 10MB per file
- **Path Sanitization**: Secure file path handling
- **Error Handling**: Comprehensive error messages

### 🚫 Access Control

- **Protected Routes**: All admin routes require authentication
- **Automatic Redirects**: Unauthenticated users redirected to login
- **Session Verification**: Every request verified

## API Endpoints

### Authentication

- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Verify session
- `POST /api/admin/logout` - Admin logout

### Font Management

- `POST /api/admin/upload` - Upload new font

## File Structure

```
src/app/admin/
├── login/page.tsx          # Admin login page
├── dashboard/page.tsx       # Admin dashboard
└── api/
    ├── login/route.ts      # Login API
    ├── verify/route.ts     # Session verification
    ├── logout/route.ts     # Logout API
    └── upload/route.ts     # Font upload API
```

## Production Deployment

### Environment Setup

1. Set secure admin credentials in production
2. Use environment variables for configuration
3. Enable HTTPS for secure cookie transmission
4. Consider implementing JWT tokens for better security

### Security Recommendations

1. **Change Default Credentials**: Always use strong, unique passwords
2. **Use HTTPS**: Enable SSL/TLS in production
3. **Rate Limiting**: Implement rate limiting for login attempts
4. **Audit Logging**: Log admin activities for security monitoring
5. **Backup Strategy**: Regular backups of uploaded fonts

## Troubleshooting

### Common Issues

1. **Login Failed**: Check credentials and environment variables
2. **Upload Failed**: Verify file type and size limits
3. **Session Expired**: Re-login to continue
4. **File Not Appearing**: Check file permissions and path

### Error Messages

- `Invalid credentials`: Wrong username/password
- `Not authenticated`: Session expired or invalid
- `Invalid file type`: Upload non-font files
- `File too large`: Exceeded 10MB limit
- `Upload failed`: Server error during upload

## Development

### Local Testing

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/admin/login`
3. Use default credentials to access dashboard
4. Test font upload functionality

### Customization

- Modify admin UI in `/src/app/admin/`
- Update API routes in `/src/app/api/admin/`
- Customize authentication logic
- Add additional admin features

## Support

For issues or questions about the admin panel:

1. Check the error messages in the dashboard
2. Verify file permissions and server configuration
3. Review the API endpoint responses
4. Check browser console for client-side errors

---

**Note**: This admin panel is designed for internal use. Ensure proper security measures are in place before deploying to production.
