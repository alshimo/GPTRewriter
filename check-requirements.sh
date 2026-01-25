#!/bin/bash

# Pre-installation Requirements Checker
# Run this before setup.sh to verify all requirements are met

echo "🔍 Checking Requirements for GPT Rewriter Extension"
echo "===================================================="
echo ""

ALL_GOOD=true

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -ge 18 ]; then
        echo "✅ $NODE_VERSION (OK)"
    else
        echo "❌ $NODE_VERSION (Need 18+)"
        ALL_GOOD=false
    fi
else
    echo "❌ Not installed"
    ALL_GOOD=false
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ $NPM_VERSION (OK)"
else
    echo "❌ Not installed"
    ALL_GOOD=false
fi

# Check Raycast (optional, but helpful)
echo -n "Checking Raycast app... "
if [ -d "/Applications/Raycast.app" ]; then
    echo "✅ Installed"
else
    echo "⚠️  Not found (you'll need to install it)"
    echo "   Download from: https://www.raycast.com/"
fi

# Check Homebrew (helpful for auto-installation)
echo -n "Checking Homebrew... "
if command -v brew &> /dev/null; then
    echo "✅ Installed (can auto-install Node.js if needed)"
else
    echo "⚠️  Not installed (manual Node.js installation required)"
fi

echo ""

if [ "$ALL_GOOD" = true ]; then
    echo "✅ All requirements met! You can proceed with setup."
    echo ""
    echo "Next step: Run ./setup.sh"
else
    echo "❌ Some requirements are missing."
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📖 INSTALLATION GUIDE"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    if ! command -v node &> /dev/null || [ "$NODE_MAJOR" -lt 18 ]; then
        echo "🔧 Installing Node.js:"
        echo ""
        
        if command -v brew &> /dev/null; then
            echo "Option 1: Auto-install via Homebrew (Recommended)"
            echo "  The setup.sh script will automatically install Node.js for you."
            echo "  Just run: ./setup.sh"
            echo ""
            echo "Option 2: Manual install via Homebrew"
            echo "  brew install node"
            echo ""
        else
            echo "Option 1: Install Homebrew first, then Node.js"
            echo "  1. Install Homebrew:"
            echo "     /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
            echo ""
            echo "  2. Install Node.js:"
            echo "     brew install node"
            echo ""
        fi
        
        echo "Option 2: Download from Official Website"
        echo "  1. Visit: https://nodejs.org/"
        echo "  2. Download the LTS version (18.x or higher)"
        echo "  3. Run the installer"
        echo "  4. Restart your terminal"
        echo ""
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "⚠️  npm should come with Node.js. If it's missing, reinstall Node.js."
        echo ""
    fi
    
    echo "After installing Node.js, run:"
    echo "  ./check-requirements.sh  # Verify installation"
    echo "  ./setup.sh               # Complete setup"
    echo ""
fi
