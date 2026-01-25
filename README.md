# GPT Rewriter - Raycast Extension

A powerful AI-powered text rewriting and transformation tool for Raycast, featuring customizable prompts and support for multiple AI providers.

## 🚀 Install in 30 Seconds

**Copy and paste this command:**

```bash
curl -fsSL https://raw.githubusercontent.com/alshimo/GPTRewriter/main/install.sh | bash
```

Then:
1. Open Raycast (`Cmd+Space`)
2. Go to Extensions → Import Extension
3. Navigate to `~/.raycast-extensions/GPTRewriter`
4. Configure your API keys in Settings

**That's it!** 🎉

### Manual Installation

If you prefer to install manually:

```bash
git clone https://github.com/alshimo/GPTRewriter.git
cd GPTRewriter
./setup.sh
```

Then import the folder in Raycast. See [INSTALLATION.md](INSTALLATION.md) for detailed instructions.

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

- **[INSTALLATION.md](INSTALLATION.md)** - Detailed installation guide
- **[EXTENSION_README.md](EXTENSION_README.md)** - Complete feature documentation
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute


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
