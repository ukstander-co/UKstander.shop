#!/bin/bash
# ==============================================================================
# 🔄 UKstander.shop Automatic Git Deployer Script (Vercel Style on Ubuntu VPS)
# Target Location: /home/ubuntu/auto-deploy.sh
# Frequency: Set on 1-minute crontab triggers (* * * * *)
# ==============================================================================

# Chron job command paths ko safe resolve karne ke liye standard PATH define karna lazmi hai
export PATH=$PATH:/usr/bin:/usr/local/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/bin:/sbin:/snap/bin

# Project root folder location
PROJECT_DIR="/home/ubuntu/UKstander.shop"

if [ ! -d "$PROJECT_DIR" ]; then
    echo "[Auto-Deploy] ERROR: Project folder not found at $PROJECT_DIR! at $(date)" >> /home/ubuntu/deploy.log
    exit 1
fi

cd "$PROJECT_DIR"

# GitHub standard main branch se latest remote references fetch karein
git fetch origin main >/dev/null 2>&1

LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse @{u})

# Agar local commit SHA aur remote commit SHA alag hain, tou automatic rebuild trigger hoga!
if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
    echo "[Auto-Deploy] New changes found on GitHub main branch! Dynamic rebuild starting..." >> /home/ubuntu/deploy.log
    
    # Force pull latest updates from GitHub
    git pull origin main >> /home/ubuntu/deploy.log 2>&1

    # Production packages status verify dependencies
    npm install --no-audit --no-fund >> /home/ubuntu/deploy.log 2>&1

    # Production compilation bundle builds (Memory constraint limits applied)
    NODE_OPTIONS="--max-old-space-size=1536" npm run build >> /home/ubuntu/deploy.log 2>&1

    # Clean PM2 process & restart our main application cleanly
    pm2 restart ukstander-shop >> /home/ubuntu/deploy.log 2>&1
    
    echo "[Auto-Deploy] SUCCESS: Web app rebuilt and restarted successfully at $(date)" >> /home/ubuntu/deploy.log
else
    # Agar updates nahi hain, to fuzool log filling se bachne ke liye quiet exit
    # uncomment below line if you want to log checks
    # echo "[Auto-Deploy] System is fully updated. Check completed at $(date)" >> /home/ubuntu/deploy.log
    exit 0
fi
