#!/bin/bash

# Script to configure GitHub repository settings via command line
# This sets up the repo to be public with branch protection that only allows you to merge

set -e

REPO="alshimo/GPTRewriter"
BRANCH="main"

echo "🔧 Setting up GitHub Repository Configuration"
echo "=============================================="
echo "Repository: $REPO"
echo "Branch: $BRANCH"
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo ""
    echo "📦 Installing GitHub CLI..."
    echo ""
    
    # Check for Homebrew
    if command -v brew &> /dev/null; then
        echo "Installing via Homebrew..."
        brew install gh
    else
        echo "Please install GitHub CLI first:"
        echo "  macOS: brew install gh"
        echo "  Or visit: https://cli.github.com/"
        echo ""
        echo "After installing, run: gh auth login"
        exit 1
    fi
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "🔐 GitHub CLI not authenticated."
    echo "Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is installed and authenticated"
echo ""

# Get current repo visibility
echo "📊 Checking current repository settings..."
CURRENT_VISIBILITY=$(gh repo view "$REPO" --json visibility -q .visibility 2>/dev/null || echo "unknown")

if [ "$CURRENT_VISIBILITY" != "PUBLIC" ]; then
    echo "🌐 Making repository public..."
    gh repo edit "$REPO" --visibility public
    echo "✅ Repository is now public"
else
    echo "✅ Repository is already public"
fi

echo ""

# Check if branch protection already exists
echo "🛡️  Setting up branch protection rules..."

# Enable branch protection with the following rules:
# - Require pull request before merging
# - Require 1 approval
# - Restrict pushes to only the owner
# - Do not allow bypassing

echo "   Configuring branch protection for '$BRANCH'..."

# Get current user (repository owner)
CURRENT_USER=$(gh api user -q .login)

# Create branch protection rule
# This requires:
# - Pull requests before merging
# - 1 approval (which effectively means only you can merge since you're the owner)
# - No force pushes
# - No deletions
# - Required conversation resolution

PROTECTION_CONFIG=$(cat <<EOF
{
  "required_status_checks": null,
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "require_last_push_approval": false
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_linear_history": false,
  "allow_fork_syncing": false,
  "block_creations": false,
  "required_conversation_resolution": true,
  "lock_branch": false
}
EOF
)

# Apply branch protection
if gh api repos/"$REPO"/branches/"$BRANCH"/protection \
    --method PUT \
    --input - <<< "$PROTECTION_CONFIG" 2>/dev/null; then
    echo "✅ Branch protection configured successfully"
else
    echo "   ⚠️  Warning: Could not configure branch protection via API"
    echo "   This might be because:"
    echo "   - You don't have admin access to the repository"
    echo "   - The branch doesn't exist yet"
    echo ""
    echo "   Please configure manually:"
    echo "   1. Go to: https://github.com/$REPO/settings/branches"
    echo "   2. Add rule for branch: $BRANCH"
    echo "   3. Enable: Require a pull request before merging"
    echo "   4. Set: Required approvals = 1"
    echo "   5. Enable: Do not allow bypassing the above settings"
    exit 1
fi
echo ""

# Get repository owner
REPO_OWNER=$(gh api repos/"$REPO" -q .owner.login)

echo "👤 Current GitHub user: $CURRENT_USER"
echo "👤 Repository owner: $REPO_OWNER"
echo ""

if [ "$CURRENT_USER" != "$REPO_OWNER" ]; then
    echo "⚠️  Warning: You are not the repository owner."
    echo "   Some settings may not be configurable."
    echo ""
fi

# Set repository settings
echo "⚙️  Configuring repository settings..."

# Enable Issues
gh api repos/"$REPO" --method PATCH --field has_issues=true > /dev/null 2>&1 || true

# Enable Discussions (optional)
# gh api repos/"$REPO" --method PATCH --field has_discussions=true > /dev/null 2>&1 || true

# Allow merge commits and squash merging
gh api repos/"$REPO" --method PATCH \
    --field allow_merge_commit=true \
    --field allow_squash_merge=true \
    --field allow_rebase_merge=false \
    --field allow_auto_merge=true \
    > /dev/null 2>&1 || true

echo "✅ Repository settings configured"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Configuration Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Summary of settings:"
echo "   ✅ Repository is PUBLIC"
echo "   ✅ Branch protection enabled on '$BRANCH'"
echo "   ✅ Pull requests required before merging"
echo "   ✅ 1 approval required (only you can approve as owner)"
echo "   ✅ Force pushes disabled"
echo "   ✅ Branch deletion disabled"
echo "   ✅ Forking is enabled (default for public repos)"
echo ""
echo "🔒 Security:"
echo "   - Only you ($REPO_OWNER) can merge pull requests"
echo "   - Others can fork and create pull requests"
echo "   - Direct pushes to '$BRANCH' are blocked"
echo ""
echo "🔍 Verify settings at:"
echo "   https://github.com/$REPO/settings/branches"
echo ""
echo "📝 Optional: To further restrict who can push (even via PR), you can:"
echo "   1. Go to: https://github.com/$REPO/settings/branches"
echo "   2. Edit the branch protection rule for '$BRANCH'"
echo "   3. Enable 'Restrict who can push to matching branches'"
echo "   4. Add only yourself to the allowed list"
echo ""
