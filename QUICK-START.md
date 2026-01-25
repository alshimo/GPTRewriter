# Quick Start Guide

## For Your Friend - Simple Installation Steps

### Step 1: Check Requirements
```bash
./check-requirements.sh
```

This will tell you if Node.js is installed and what you need to do.

### Step 2: Run Setup
```bash
./setup.sh
```

**What this does:**
- ✅ Checks if Node.js is installed
- ✅ **Automatically installs Node.js** (if you have Homebrew)
- ✅ Installs all dependencies
- ✅ Sets up the extension

### If Node.js Installation is Needed

The setup script will try to install Node.js automatically if you have Homebrew. If not, it will show you instructions.

**Quick Node.js Installation Options:**

1. **If you have Homebrew** (most Mac users):
   ```bash
   brew install node
   ```

2. **If you don't have Homebrew**:
   - Install Homebrew first:
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Then install Node.js:
     ```bash
     brew install node
     ```

3. **Or download from website**:
   - Visit: https://nodejs.org/
   - Download LTS version (18.x or higher)
   - Run the installer
   - **Restart your terminal**

### Step 3: Import to Raycast

1. Open Raycast (`Cmd+Space`)
2. Type "Extensions" and select it
3. Click "Import Extension"
4. Select this folder

### Step 4: Configure API Keys

1. In Raycast, type "Settings" (from GPT Rewriter)
2. Add your OpenAI API Key (required)
3. Optionally add OpenRouter API Key
4. Save settings

### Step 5: Test It!

1. Select some text in any app
2. Open Raycast
3. Type "Rewrite Text"
4. Press Enter
5. The rewritten text is copied to your clipboard! 🎉

---

## Troubleshooting

**"Node.js not found" after installation?**
- Restart your terminal (very important!)
- Run `./check-requirements.sh` again

**Setup script fails?**
- Make sure you have internet connection
- Check if Homebrew is working: `brew --version`
- See [INSTALLATION.md](INSTALLATION.md) for detailed help

**Need more help?**
- See [INSTALLATION.md](INSTALLATION.md) for complete instructions
- See [EXTENSION_README.md](EXTENSION_README.md) for usage guide
