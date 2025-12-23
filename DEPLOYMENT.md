# Vashatkaara Deployment Guide

This document provides the technical instructions for deploying the Vashatkaara platform to a standalone cloud server (e.g., AWS EC2, DigitalOcean Droplet, Linode) and attaching a custom domain.

## 1. Prerequisites

- **OS**: Ubuntu 22.04 LTS (Recommended)
- **Runtime**: Node.js 18.x or higher
- **Web Server**: Nginx
- **Security**: Certbot (for Let's Encrypt SSL)

## 2. Environment Variables

The application relies on the Gemini API for the "AI Strategist" feature. Ensure the following environment variable is available in your build/shell environment:

```bash
export API_KEY="your_google_gemini_api_key_here"
```

*Note: In a production environment, you may need to inject this via your CI/CD pipeline or a `.env` file depending on your build toolchain.*

## 3. Build Process

Execute these commands on your local machine or build server to generate the static distribution bundle:

```bash
# Install dependencies
npm install

# Generate production build
npm run build
```

The resulting files will be located in the `/dist` directory.

## 4. Server Setup (Ubuntu/Nginx)

### A. Initial Server Preparation
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx -y
```

### B. Transfer Files
Copy the contents of the `/dist` folder to your server's web root:
```bash
sudo mkdir -p /var/www/vashatkaara
# Assuming you are using SCP or similar to upload
# scp -r ./dist/* user@your-server-ip:/var/www/vashatkaara/
```

### C. Nginx Configuration
Create a new configuration file:
`sudo nano /etc/nginx/sites-available/vashatkaara`

Paste the following configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/vashatkaara;
    index index.html;

    # Handle Single Page Application Routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optimization: Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/vashatkaara /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 5. Domain & SSL Setup

### A. DNS Configuration
Log in to your Domain Registrar (e.g., GoDaddy, Namecheap) and create an **A Record**:
- **Host**: `@`
- **Value**: `Your Server Public IP`
- **TTL**: `3600` (or default)

### B. Enable HTTPS (SSL)
Use Certbot to automatically provision and install an SSL certificate:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Select the option to "Redirect all HTTP traffic to HTTPS" when prompted.

## 6. Maintenance

- **Log Access**: `sudo tail -f /var/log/nginx/access.log`
- **Error Logs**: `sudo tail -f /var/log/nginx/error.log`
- **Automated Renewals**: Certbot handles this via a cron job, but you can test it with `sudo certbot renew --dry-run`.

---
*Vashatkaara Solutions Inc. | Engineering the Future*
