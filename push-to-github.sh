#!/usr/bin/env bash
# Push portfolio to GitHub — run from this folder in bash / git-bash
# Usage:  bash push-to-github.sh

set -e

echo "Cleaning stale .git directory..."
rm -rf .git

echo "Initializing fresh repo..."
git init -b main

echo "Adding remote..."
git remote add origin https://github.com/parthesaurabh1616/SaurabhParthe-Portfolio.git

echo "Staging files..."
git add .

echo "Committing..."
git commit -m "feat: production-grade portfolio for distributed systems & AI infrastructure"

echo "Pushing to GitHub..."
git push -u origin main --force

echo ""
echo "Done. Repository: https://github.com/parthesaurabh1616/SaurabhParthe-Portfolio"
