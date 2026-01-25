# GPT Rewriter - Raycast Extension

A powerful AI-powered text rewriting and transformation tool for Raycast, featuring customizable prompts and support for multiple AI providers.

## 🚀 Quick Install

### One-Line Installation

```bash
curl -fsSL https://raw.githubusercontent.com/alshimo/GPTRewriter/main/install.sh | bash
```

Or using npx (if you prefer):

```bash
npx -y @alshimo/gpt-rewriter-install
```

### Manual Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/alshimo/GPTRewriter.git
   cd GPTRewriter
   ```

2. **Check requirements** (optional): `./check-requirements.sh`

3. **Run setup**: `./setup.sh` (will auto-install Node.js if needed via Homebrew)

4. **Start development**: `npm run dev`

5. **Import in Raycast**: Extensions → Import Extension → Select this folder

**Note:** The setup script will automatically install Node.js 18+ if you have Homebrew installed. Otherwise, see [INSTALLATION.md](INSTALLATION.md) for manual installation instructions.

### Configuration
1. **Open Settings** in the extension
2. **Add API keys**:
   - OpenAI API Key: [Get from OpenAI](https://platform.openai.com/api-keys)
   - OpenRouter API Key: [Get from OpenRouter](https://openrouter.ai/keys)
3. **Choose your preferred AI provider and model**

## 🎯 Features

- **Text Rewriting**: Improve grammar and clarity
- **Workplace Rewriting**: Optimize for Slack/tech chat
- **Translation**: Support for 5 languages (EN, TR, FA, ES)
- **Summarization**: Create concise summaries
- **Bullet Points**: Convert text to organized lists
- **Custom Prompts**: Create your own transformations
- **Multiple AI Providers**: OpenAI and OpenRouter support

## 📁 Project Structure

```
├── src/
│   ├── lib/
│   │   └── ai.ts              # AI processing logic
│   ├── rewrite.tsx            # Text rewriting command
│   ├── workplace.tsx          # Workplace rewriting command
│   ├── translate.tsx          # Translation command
│   ├── summarize.tsx          # Summarization command
│   ├── bullets.tsx            # Bullet points command
│   ├── custom.tsx             # Custom prompts command
│   └── settings.tsx           # Settings command
├── package.json               # Extension configuration
├── tsconfig.json              # TypeScript config
├── setup.sh                   # Development setup script
└── EXTENSION_README.md        # Detailed documentation
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Publish to Raycast store
npm run publish
```

## 📖 Documentation

See [EXTENSION_README.md](EXTENSION_README.md) for comprehensive documentation including:
- Detailed feature descriptions
- User guides
- Troubleshooting
- Contributing guidelines

## 📦 Sharing This Extension

Since this extension isn't available on the Raycast store, you can share it with friends using these methods:

### Option 1: GitHub (Recommended)
1. Share the repository URL: `https://github.com/alshimo/GPTRewriter`
2. They can use the one-line installer:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/alshimo/GPTRewriter/main/install.sh | bash
   ```

### Option 2: Direct File Sharing
1. Create a ZIP file (exclude `node_modules` folder)
2. Share via email, cloud storage, or messaging
3. Your friend extracts and follows [INSTALLATION.md](INSTALLATION.md)

**Important:** Make sure to exclude `node_modules` when sharing - it's large and will be regenerated with `npm install`.

## 🤝 Contributing

Contributions are welcome! This repository uses a fork-based workflow.

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
5. **Push to your fork** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

MIT License
