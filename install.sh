#!/bin/bash

# One-line installer for GPT Rewriter Raycast Extension
# Usage: curl -fsSL https://raw.githubusercontent.com/alshimo/GPTRewriter/main/install.sh | bash
# Or: bash <(curl -fsSL https://raw.githubusercontent.com/alshimo/GPTRewriter/main/install.sh)

set -e

REPO_URL="https://github.com/alshimo/GPTRewriter.git"
INSTALL_DIR="$HOME/.raycast-extensions/GPTRewriter"

echo "🚀 Installing GPT Rewriter Raycast Extension"
echo "=============================================="
echo ""

# Check if Raycast extensions directory exists
if [ ! -d "$HOME/.raycast-extensions" ]; then
    echo "📁 Creating Raycast extensions directory..."
    mkdir -p "$HOME/.raycast-extensions"
fi

# Check if already installed
if [ -d "$INSTALL_DIR" ]; then
    echo "⚠️  Extension already exists at $INSTALL_DIR"
    read -p "Do you want to update it? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🔄 Updating extension..."
        cd "$INSTALL_DIR"
        if [ -d ".git" ]; then
            git pull origin main
        else
            rm -rf "$INSTALL_DIR"
            git clone "$REPO_URL" "$INSTALL_DIR"
        fi
    else
        echo "❌ Installation cancelled."
        exit 1
    fi
else
    echo "📥 Cloning repository..."
    git clone "$REPO_URL" "$INSTALL_DIR"
fi

cd "$INSTALL_DIR"

# Check requirements
echo ""
echo "🔍 Checking requirements..."
if [ -f "./check-requirements.sh" ]; then
    chmod +x ./check-requirements.sh
    ./check-requirements.sh
fi

# Run setup
echo ""
echo "⚙️  Running setup..."
if [ -f "./setup.sh" ]; then
    chmod +x ./setup.sh
    ./setup.sh
else
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 NEXT STEPS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Start development mode:"
echo "   cd $INSTALL_DIR"
echo "   npm run dev"
echo ""
echo "   This will automatically load the extension in Raycast."
echo "   Keep this terminal window open while using the extension."
echo ""
echo "2. Configure API Keys:"
echo "   - In Raycast, type 'Settings' (from GPT Rewriter)"
echo "   - Add your OpenAI API Key"
echo "   - Optionally add OpenRouter API Key"
echo ""
echo "📖 For more help, see: $INSTALL_DIR/INSTALLATION.md"
echo ""
