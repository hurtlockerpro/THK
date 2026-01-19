# GitHub Actions & Custom Runner Demo

A simple Next.js application demonstrating GitHub Actions with both GitHub-hosted runners and self-hosted custom runners.

## Project Structure

```
demo-github-actions/
├── app/
│   ├── page.js          # Main page component
│   └── layout.js        # Root layout
├── .github/
│   └── workflows/
│       ├── ci.yml              # GitHub-hosted runner workflow
│       └── custom-runner.yml   # Self-hosted runner workflow
├── package.json
└── next.config.js
```

## GitHub Actions Workflows

### 1. CI Workflow (GitHub-hosted runner)
- **File**: `.github/workflows/ci.yml`
- **Trigger**: Pushes and pull requests to main/master branch
- **Runner**: `ubuntu-latest` (GitHub-hosted)
- **Steps**: Checkout → Setup Node → Install dependencies → Build

### 2. Custom Runner Workflow (Self-hosted)
- **File**: `.github/workflows/custom-runner.yml`
- **Trigger**: Pushes to main/master branch or manual trigger
- **Runner**: `self-hosted` (Your custom runner)
- **Steps**: Checkout → Display info → Setup Node → Install → Build → Custom deployment

## Setup Instructions

### 1. Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at `http://localhost:3000`

### 2. Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Next.js app with GitHub Actions"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Setting Up Self-Hosted Runner

#### Step 1: Navigate to Repository Settings
1. Go to your GitHub repository
2. Click **Settings** → **Actions** → **Runners**
3. Click **New self-hosted runner**

#### Step 2: Choose Your Platform
Select your operating system (Linux, macOS, or Windows)

#### Step 3: Download and Configure Runner

**For Linux/macOS:**

```bash
# Create a folder
mkdir actions-runner && cd actions-runner

# Download the latest runner package
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz

# Extract the installer
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz

# Configure the runner
./config.sh --url https://github.com/YOUR_USERNAME/YOUR_REPO --token YOUR_TOKEN

# Run the runner
./run.sh
```

**For Windows (PowerShell as Admin):**

```powershell
# Create a folder under the drive root
mkdir actions-runner; cd actions-runner

# Download the latest runner package
Invoke-WebRequest -Uri https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-win-x64-2.311.0.zip -OutFile actions-runner-win-x64-2.311.0.zip

# Extract the installer
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory("$PWD/actions-runner-win-x64-2.311.0.zip", "$PWD")

# Configure the runner
./config.cmd --url https://github.com/YOUR_USERNAME/YOUR_REPO --token YOUR_TOKEN

# Run the runner
./run.cmd
```

#### Step 4: Install as a Service (Optional)

**Linux/macOS:**
```bash
sudo ./svc.sh install
sudo ./svc.sh start
```

**Windows:**
```powershell
./svc.cmd install
./svc.cmd start
```

### 4. Verify Runner is Working

1. Go to your repository → **Settings** → **Actions** → **Runners**
2. You should see your runner with a green "Idle" status
3. Push a change to trigger the workflows
4. Check the **Actions** tab to see both workflows running

## Understanding the Workflows

### GitHub-Hosted Runner (ci.yml)
- Uses GitHub's infrastructure
- No setup required
- Limited to GitHub's available environments
- Good for standard CI/CD tasks

### Self-Hosted Runner (custom-runner.yml)
- Runs on your own machine/server
- Full control over environment
- Can access local resources
- Good for deployments, specialized hardware, or private resources

## Testing the Setup

1. Make a simple change to `app/page.js`
2. Commit and push to GitHub
3. Go to the **Actions** tab in your repository
4. You should see both workflows running:
   - CI workflow on GitHub-hosted runner
   - Custom Runner workflow on your self-hosted runner

## Troubleshooting

### Runner Not Appearing
- Check that the runner service is running
- Verify the token hasn't expired
- Ensure network connectivity to GitHub

### Workflow Not Triggering
- Check the branch name matches (main vs master)
- Verify workflow files are in `.github/workflows/`
- Check repository settings for Actions being enabled

### Build Failing
- Ensure Node.js is installed on the runner
- Check npm dependencies are compatible
- Review the workflow logs in the Actions tab

## Security Notes

- Keep your runner token secure
- Don't use self-hosted runners on public repositories (security risk)
- Regularly update your runner software
- Consider using runner groups for better access control

## Next Steps

- Add deployment steps to the custom runner workflow
- Set up environment secrets for sensitive data
- Configure notifications for workflow failures
- Add more sophisticated testing steps

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Self-hosted Runners Guide](https://docs.github.com/en/actions/hosting-your-own-runners)
- [Next.js Documentation](https://nextjs.org/docs)
