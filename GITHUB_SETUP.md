# GitHub Repository Setup Guide

This guide will help you configure your GitHub repository to be public while preventing direct merges from other users.

## Step 1: Make Repository Public

1. Go to your repository: `https://github.com/alshimo/GPTRewriter`
2. Click on **Settings** (top right, gear icon)
3. Scroll down to **Danger Zone** section
4. Click **Change visibility**
5. Select **Make public**
6. Type the repository name to confirm
7. Click **I understand, change repository visibility**

## Step 2: Disable Direct Pushes (Branch Protection)

1. In **Settings**, go to **Branches** (left sidebar)
2. Under **Branch protection rules**, click **Add rule**
3. Configure the rule:
   - **Branch name pattern**: `main` (or `*` for all branches)
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals: Set to `1` or more
     - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ **Require status checks to pass before merging** (optional, if you add CI)
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Do not allow bypassing the above settings** (even for admins - optional but recommended)
   - ✅ **Restrict who can push to matching branches**: Leave empty or add only yourself
4. Click **Create**

## Step 3: Configure Repository Settings

1. In **Settings**, go to **General**
2. Scroll to **Features** section:
   - ✅ **Issues**: Enable (allows users to report bugs)
   - ✅ **Discussions**: Optional (for community discussions)
   - ✅ **Projects**: Optional
   - ✅ **Wiki**: Optional
3. Scroll to **Pull Requests**:
   - ✅ **Allow merge commits**: Enable
   - ✅ **Allow squash merging**: Enable (recommended)
   - ✅ **Allow rebase merging**: Optional
   - ✅ **Always suggest updating pull request branches**: Enable
   - ✅ **Allow auto-merge**: Optional (auto-merge when conditions are met)

## Step 4: Verify Forking is Enabled

1. In **Settings**, go to **General**
2. Scroll to **Features**
3. Make sure **Forking** is enabled (it should be by default for public repos)

## Step 5: Optional - Add Collaborators (if you want specific people to merge)

If you want to allow specific people to merge pull requests:

1. Go to **Settings** → **Collaborators**
2. Click **Add people**
3. Add their GitHub username
4. Set permission to **Write** or **Maintain** (not Admin unless you trust them completely)

## Result

After these settings:
- ✅ Repository is **public** (anyone can view and fork)
- ✅ Users can **fork** the repository
- ✅ Users can **create pull requests** from their forks
- ❌ Users **cannot directly push** to main branch
- ❌ Users **cannot merge** without your approval (or designated reviewers)
- ✅ You maintain full control over what gets merged

## Testing the Setup

1. Create a test account or ask a friend to:
   - Fork your repository
   - Make a small change
   - Create a pull request
2. Verify that:
   - The PR requires your approval
   - They cannot merge it themselves
   - You can review and merge it

## Additional Security (Optional)

### Require Signed Commits

1. In **Settings** → **Branches**
2. Edit your branch protection rule
3. Enable **Require signed commits**

### Add Status Checks (CI/CD)

If you add GitHub Actions or other CI:
1. In branch protection, enable **Require status checks**
2. Select which checks must pass
3. This ensures code quality before merging

---

**Note:** These settings ensure that only you (or designated collaborators) can merge changes, while still allowing the community to contribute via forks and pull requests.
