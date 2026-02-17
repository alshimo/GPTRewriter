# Install GPT Rewriter

## Quick Install

### Step 1: Clone the Repository

```bash
git clone https://github.com/alshimo/GPTRewriter.git
cd GPTRewriter
```

### Step 2: Install Dependencies

```bash
npm install
```

Or use the setup script (auto-installs Node.js if needed):

```bash
./setup.sh
```

### Step 3: Start Development Mode

```bash
npm run dev
```

This will:
- Start the Raycast development server
- Automatically load the extension in Raycast
- Watch for changes and reload automatically

### Step 4: Configure API Keys

1. Open Raycast (`Cmd+Space`)
2. Type "Settings" (from GPT Rewriter extension)
3. Add your OpenAI API Key (required)
4. Optionally add OpenRouter API Key
5. Configure your preferred model and settings

**Done!** 🎉

**Note:** Keep `npm run dev` running while you use the extension. The extension works in development mode.

---

## What You Need

- macOS (Raycast is macOS-only)
- Node.js 18+ ([Download](https://nodejs.org/) or auto-installed via Homebrew with `./setup.sh`)
- Raycast app ([Download](https://www.raycast.com/))
- OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))

---

## Troubleshooting

**`npm run dev` not working?**
- Make sure Node.js is installed: `node -v` (should be 18+)
- Make sure dependencies are installed: `npm install`
- Check if Raycast is running

**Extension not appearing?**
- Make sure `npm run dev` is running
- Restart Raycast
- Check the terminal for error messages

**Need more help?**
- Full guide: [INSTALLATION.md](INSTALLATION.md)
- GitHub: https://github.com/alshimo/GPTRewriter
