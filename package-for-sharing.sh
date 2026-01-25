#!/bin/bash

# Script to package the GPT Rewriter extension for sharing
# This creates a clean ZIP file excluding node_modules and other unnecessary files

echo "📦 Packaging GPT Rewriter Extension for Sharing"
echo "================================================"

# Get the directory name
DIR_NAME="GPTRewriter"
ZIP_NAME="GPTRewriter-extension.zip"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the extension root directory."
    exit 1
fi

# Create a temporary directory for packaging
TEMP_DIR=$(mktemp -d)
PACKAGE_DIR="$TEMP_DIR/$DIR_NAME"

echo "📁 Creating package directory..."
mkdir -p "$PACKAGE_DIR"

# Copy files (excluding node_modules and other ignored files)
echo "📋 Copying files..."

# Copy all files except those in .gitignore
rsync -av \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='dist' \
    --exclude='*.log' \
    --exclude='.env' \
    --exclude='.env.local' \
    --exclude='.DS_Store' \
    --exclude='*.swp' \
    --exclude='*.swo' \
    --exclude='.raycast' \
    --exclude='package-lock.json' \
    . "$PACKAGE_DIR/"

# Create ZIP file
echo "🗜️  Creating ZIP file..."
cd "$TEMP_DIR"
zip -r "$ZIP_NAME" "$DIR_NAME" > /dev/null

# Move ZIP to original directory
mv "$ZIP_NAME" "$OLDPWD/"

# Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Package created successfully: $ZIP_NAME"
echo ""
echo "📝 Next steps:"
echo "1. Share the ZIP file with your friend"
echo "2. They should extract it and follow INSTALLATION.md"
echo "3. Make sure they run 'npm install' after extracting"
echo ""
echo "📦 Package size: $(du -h "$OLDPWD/$ZIP_NAME" | cut -f1)"
