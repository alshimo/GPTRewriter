# Installation Guide for GPT Rewriter Extension

This guide will help you install the GPT Rewriter Raycast extension on your Mac.

## Prerequisites

- **macOS** (Raycast is macOS-only)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Raycast app** - [Download here](https://www.raycast.com/)
- **npm** (comes with Node.js)

### Quick Prerequisites Check

Before installing, run the requirements checker:

```bash
./check-requirements.sh
```

This will tell you what's missing and how to install it.

## Installation Methods

### Method 1: From GitHub (Recommended)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd GPTRewriter
   ```

2. **Check requirements first (optional but recommended):**
   ```bash
   chmod +x check-requirements.sh
   ./check-requirements.sh
   ```
   
   This will check if Node.js is installed and guide you if it's missing.

3. **Run the setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
   
   **Note:** The setup script will automatically install Node.js via Homebrew if:
   - Homebrew is installed on your Mac
   - Node.js is missing or outdated
   
   Or manually install dependencies:
   ```bash
   npm install
   ```

3. **Import into Raycast:**
   - Open Raycast (`Cmd+Space`)
   - Type "Extensions" and select it
   - Click "Import Extension"
   - Navigate to and select the `GPTRewriter` folder
   - The extension will be imported and ready to use

4. **Configure API Keys:**
   - Open Raycast
   - Type "Settings" (from the GPT Rewriter extension)
   - Add your OpenAI API Key (required)
   - Optionally add OpenRouter API Key (for alternative models)
   - Configure your preferred default model and settings

### Method 2: From ZIP File

1. **Extract the ZIP file:**
   ```bash
   unzip GPTRewriter.zip
   cd GPTRewriter
   ```

2. **Check requirements first (optional but recommended):**
   ```bash
   chmod +x check-requirements.sh
   ./check-requirements.sh
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```
   
   Or use the setup script (will auto-install Node.js if needed):
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Import into Raycast:**
   - Open Raycast (`Cmd+Space`)
   - Type "Extensions" and select it
   - Click "Import Extension"
   - Navigate to and select the `GPTRewriter` folder
   - The extension will be imported and ready to use

4. **Configure API Keys:**
   - Open Raycast
   - Type "Settings" (from the GPT Rewriter extension)
   - Add your OpenAI API Key (required)
   - Optionally add OpenRouter API Key (for alternative models)
   - Configure your preferred default model and settings

## Getting API Keys

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (you won't be able to see it again)

### OpenRouter API Key (Optional)
1. Go to [OpenRouter](https://openrouter.ai/keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key

## Verification

To verify the installation:

1. **Check extension is loaded:**
   - Open Raycast
   - Type "Rewrite Text" - you should see the command

2. **Test a command:**
   - Select some text in any app
   - Open Raycast
   - Type "Rewrite Text" and press Enter
   - The rewritten text should be copied to your clipboard

## Installing Node.js

If Node.js is not installed, you have several options:

### Option 1: Automatic Installation (Recommended)

If you have Homebrew installed, the setup script will automatically install Node.js:

```bash
./setup.sh
```

### Option 2: Install via Homebrew

1. **Install Homebrew** (if not already installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Node.js**:
   ```bash
   brew install node
   ```

3. **Verify installation**:
   ```bash
   node -v  # Should show v18.x.x or higher
   npm -v   # Should show version number
   ```

### Option 3: Download from Official Website

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the **LTS version** (18.x or higher)
3. Run the installer
4. **Restart your terminal** after installation
5. Verify installation:
   ```bash
   node -v
   npm -v
   ```

### After Installing Node.js

1. **Restart your terminal** (important!)
2. Run the requirements check:
   ```bash
   ./check-requirements.sh
   ```
3. Proceed with the installation steps above

## Troubleshooting

### Node.js not found after installation
- **Restart your terminal** - this is often required
- Check if Node.js is in your PATH: `which node`
- If using Homebrew, you may need to add it to PATH:
  ```bash
  echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
  source ~/.zshrc
  ```

### Extension not appearing in Raycast
- Make sure you imported the correct folder (the one containing `package.json`)
- Restart Raycast
- Check that `npm install` completed successfully

### "No API key configured" error
- Open Settings in the extension
- Make sure you've added at least an OpenAI API Key
- Save the settings

### Commands not working
- Check your internet connection
- Verify your API keys are correct
- Check your API usage limits on OpenAI/OpenRouter

### Build errors
- Make sure Node.js 18+ is installed: `node -v`
- Try deleting `node_modules` and running `npm install` again
- Check that all files were extracted/copied correctly

## Development Mode

To run in development mode:

```bash
npm run dev
```

This will start the development server and automatically reload when you make changes.

## Updating the Extension

If you receive an updated version:

1. **From GitHub:**
   ```bash
   git pull
   npm install
   ```

2. **From ZIP:**
   - Replace the old folder with the new one
   - Run `npm install` again
   - Restart Raycast

## Support

If you encounter any issues:
1. Check the [EXTENSION_README.md](EXTENSION_README.md) for detailed documentation
2. Review the troubleshooting section above
3. Check that all prerequisites are installed correctly

---

**Note:** This extension requires an active internet connection and valid API keys to function. API usage may incur costs depending on your provider and usage.
