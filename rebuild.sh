#!/bin/bash
# Rebuild script for Verdant Digital website
# Run this script after making code changes

set -e

echo "Building production version..."
npm run build

echo "Setting permissions..."
chown -R www-data:www-data /opt/controlpanel/dist

echo "Reloading nginx..."
systemctl reload nginx

echo "✓ Build complete! Site updated at https://verdantdigital.com.au"
