# Push portfolio to GitHub — run from this folder in PowerShell
# Usage:  .\push-to-github.ps1

$ErrorActionPreference = 'Stop'

Write-Host "Cleaning stale .git directory..." -ForegroundColor Cyan
if (Test-Path .git) {
    Remove-Item -Recurse -Force .git
}

Write-Host "Initializing fresh repo..." -ForegroundColor Cyan
git init -b main

Write-Host "Adding remote..." -ForegroundColor Cyan
git remote add origin https://github.com/parthesaurabh1616/SaurabhParthe-Portfolio.git

Write-Host "Staging files..." -ForegroundColor Cyan
git add .

Write-Host "Committing..." -ForegroundColor Cyan
git commit -m "feat: production-grade portfolio for distributed systems & AI infrastructure"

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main --force

Write-Host "`nDone. Repository: https://github.com/parthesaurabh1616/SaurabhParthe-Portfolio" -ForegroundColor Green
