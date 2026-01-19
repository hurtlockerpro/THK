# Quick Setup Guide

## 1. Test Locally

```bash
cd demo-github-actions
npm install
npm run dev
```

Visit http://localhost:3000

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## 3. Setup Custom Runner

### Get Runner Token
1. Go to your repo on GitHub
2. Settings → Actions → Runners → New self-hosted runner
3. Copy the token from the configuration command

### Install Runner (Linux/Mac)

```bash
# Create folder
mkdir ~/actions-runner && cd ~/actions-runner

# Download runner (check GitHub for latest version)
curl -o actions-runner.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz

# Extract
tar xzf ./actions-runner.tar.gz

# Configure (replace with your URL and token)
./config.sh --url https://github.com/YOUR_USERNAME/YOUR_REPO --token YOUR_TOKEN

# Start runner
./run.sh
```

### Install as Service (Optional)

```bash
sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status
```

## 4. Test the Workflows

Make any change to the code and push:

```bash
# Edit app/page.js
git add .
git commit -m "Test workflows"
git push
```

Check the Actions tab in your GitHub repository to see both workflows running!

## Key Points

- **ci.yml** - Runs on GitHub's servers (ubuntu-latest)
- **custom-runner.yml** - Runs on YOUR machine (self-hosted)
- Both workflows trigger on push to main branch
- Custom runner workflow can also be triggered manually

## Verify Runner Status

GitHub Repository → Settings → Actions → Runners

You should see your runner with status "Idle" (green) or "Active" (running a job)
