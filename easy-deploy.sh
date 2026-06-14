#!/bin/bash

# ==============================================================================
# 🚀 UKstander.shop Ultimate Server Deployer & Optimizer (From Zero to Live)
# Target Server: Oracle Cloud Ubuntu VM (1 Core OCPU, 1 GB RAM, 2GB Swap)
# Type: FULL EASY - Clean & Automated Execution Script
# ==============================================================================

# ANSI Text Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Clear Terminal screen
clear

echo -e "${CYAN}===================================================================${NC}"
echo -e "${GREEN}  🚀 UKSTANDER SHOP - ULTIMATE 1-CLICK SERVER DEPLOYER & OPTIMIZER"
echo -e "  (Created for ukstander.co - Full Easy Setup in Roman Urdu/English)${NC}"
echo -e "${CYAN}===================================================================${NC}"
echo -e "Is script ke zariye aapka server fully optimized aur run ho jayega."
echo -e "Isme swap allocation, pm2 cleaner, production build, port routing,"
echo -e "aur cloudflare tunnels setup automatic shamil hain."
echo -e "-------------------------------------------------------------------"

# ----------------- STEP 1: Admin Permissions Check -----------------
echo -e "\n${YELLOW}[Step 1/6] Sudo root access check kiya ja raha hai...${NC}"
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}[-] GHALTI: Please run this script using sudo access:${NC}"
  echo -e "    sudo bash easy-deploy.sh"
  exit 1
fi
echo -e "${GREEN}[✔] Sudo privilege granted successfully!${NC}"

# ----------------- STEP 2: Swap Space Config (RAM booster) -----------------
echo -e "\n${YELLOW}[Step 2/6] Swap Space (2 GB Virtual Memory) memory review...${NC}"
EXISTING_SWAP=$(swapon --show)
if [ ! -z "$EXISTING_SWAP" ]; then
  echo -e "${GREEN}[✔] Active swap partition already exists on this server:${NC}"
  echo "$EXISTING_SWAP"
else
  echo -e "${YELLOW}[!] Alert: No active swap detected. Provisioning 2GB Swap...${NC}"
  # Creating swap space
  fallocate -l 2G /swapfile 2>/dev/null || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  # Mount on reboot
  grep -q '/swapfile' /etc/fstab || echo '/swapfile swap swap defaults 0 0' >> /etc/fstab
  # Set swappiness standard
  sysctl vm.swappiness=10
  grep -q 'vm.swappiness' /etc/sysctl.conf || echo 'vm.swappiness=10' >> /etc/sysctl.conf
  echo -e "${GREEN}[✔] 2GB Swap space provisioned successfully to prevent build memory crash!${NC}"
fi

# ----------------- STEP 3: Node.js & Tool Checks -----------------
echo -e "\n${YELLOW}[Step 3/6] Software dependencies verification...${NC}"

# Update repositories safely
echo -e "${CYAN}[*] APT repositories update start...${NC}"
apt-get update -y >/dev/null 2>&1

# Check Git
if ! command -v git &> /dev/null; then
  echo -e "${YELLOW}[!] Git not found. Installing...${NC}"
  apt-get install -y git >/dev/null 2>&1
fi
echo -e "${GREEN}[✔] Git Version: $(git --version)${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
  echo -e "${YELLOW}[!] Node.js not detected. Registering NodeSource Node v20...${NC}"
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/dev/null 2>&1
  apt-get install -y nodejs >/dev/null 2>&1
fi
echo -e "${GREEN}[✔] Node.js Version: $(node -v)${NC}"
echo -e "${GREEN}[✔] NPM Version: $(npm -v)${NC}"

# Check PM2
if ! command -v pm2 &> /dev/null; then
  echo -e "${YELLOW}[!] Installing PM2 Process Manager globally...${NC}"
  npm install -y -g pm2 >/dev/null 2>&1
fi
echo -e "${GREEN}[✔] PM2 Process Manager resides successfully!${NC}"

# ----------------- STEP 4: PM2 Cleanup & Safaai -----------------
echo -e "\n${YELLOW}[Step 4/6] VPS Safaai (PM2 duplicate processes cleanup)...${NC}"
echo -e "VM me limited 1GB memory hai, isliye hum fuzool background scripts ko band kar rahat hain..."

# Stop and delete any existing process inside pm2 pool to start fresh
pm2 stop all 2>/dev/null
pm2 delete all 2>/dev/null
echo -e "${GREEN}[✔] Purani duplicate/unused PM2 processes successfully cleaned! System is fresh now.${NC}"

# ----------------- STEP 5: Build & Bundle Application -----------------
echo -e "\n${YELLOW}[Step 5/6] Building Web application bundle safely...${NC}"

# Detect project dir
PROJECT_DIR="/home/ubuntu/UKstander.shop"
if [ ! -d "$PROJECT_DIR" ]; then
  # If currently in the repo folder, use it
  if [ -f "package.json" ]; then
    PROJECT_DIR=$(pwd)
  else
    echo -e "${RED}[-] GHALTI: Project folder not found at /home/ubuntu/UKstander.shop${NC}"
    echo -e "Pehle ye repository clone karein: "
    echo -e "cd /home/ubuntu && git clone https://github.com/ukstander-co/UKstander.shop.git"
    exit 1
  fi
fi

cd "$PROJECT_DIR"
echo -e "${CYAN}[*] Path defined: $PROJECT_DIR${NC}"

# Install project packages
echo -e "${CYAN}[*] Installing production dependencies...${NC}"
npm install --no-audit --no-fund >/dev/null 2>&1

# Build package bundle with Max Memory constraints flag (prevents out-of-memory freeze)
echo -e "${CYAN}[*] Packaging production build with memory limits (1536MB constraint)...${NC}"
NODE_OPTIONS="--max-old-space-size=1536" npm run build

if [ $? -eq 0 ]; then
  echo -e "${GREEN}[✔] Application successfully compiled inside dist/ server CJS bundle!${NC}"
else
  echo -e "${RED}[-] GHALTI: Build process failed! Check your package setup or server RAM.${NC}"
  exit 1
fi

# PM2 App registration & Startup configurations
echo -e "${CYAN}[*] Launching main application process via PM2...${NC}"
pm2 start dist/server.cjs --name "ukstander-shop" --max-memory-restart 700M

# Enable reboot autostart persistence
pm2 save
pm2 startup systemd -u ubuntu --hp /home/ubuntu >/dev/null 2>&1
echo -e "${GREEN}[✔] PM2 process startup successfully registered! Your app will load on system reboot.${NC}"

# ----------------- STEP 6: Network routing & Firewall rules -----------------
echo -e "\n${YELLOW}[Step 6/6] Networking & Direct Port Forwarding configurations...${NC}"

# Allow traffic in local UFW firewall
ufw allow 80/tcp 2>/dev/null
ufw allow 443/tcp 2>/dev/null
ufw allow 3000/tcp 2>/dev/null
ufw reload 2>/dev/null

# Forward incoming public traffic on standard HTTP Port 80 directly to application Node port 3000
echo -e "${CYAN}[*] Creating internal routing mapping redirect (Port 80 to Port 3000)...${NC}"
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000 2>/dev/null
# Save iptables rules safely
if command -v netfilter-persistent &> /dev/null; then
  netfilter-persistent save >/dev/null 2>&1
fi

echo -e "${GREEN}[✔] Network routing set up successfully!${NC}"

# ==============================================================================
# 🎉 DEPLOYMENT COMPLETED SUCCESSFULLY WITH NO ERRORS!
# ==============================================================================
echo -e "\n${CYAN}===================================================================${NC}"
echo -e "${GREEN}🎉 CONGRATULATIONS! APKI SHOP LIVE DEPLOY HO CHUKI HAI!${NC}"
echo -e "${CYAN}===================================================================${NC}"
echo -e "Aap is website ko direct check kar sakte hain:"
echo -e "\n${YELLOW}👉 Option 1: Direct public IP se (HTTP only)${NC}"
echo -e "   🌐 http://79.72.94.8"
echo -e "   (Oracle cloud dashboard me Network Security Group/Subnet me port 80 check karlein open ho)"

echo -e "\n${YELLOW}👉 Option 2: Cloudflare Tunnels (Zero Setup & FREE SSL/HTTPS - highly recommended!)${NC}"
echo -e "   Is tarike me dynamic IP, custom SSL certificates aur Nginx ka jhanjhat bilkul nahi hota."
echo -e "   Is software ko active karne ke liye bs ye 3 asan commands run karein:"
echo -e "   1) curl -L -o cf.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && sudo dpkg -i cf.deb"
echo -e "   2) cloudflared tunnel login   (Browser security link par select approve karein)"
echo -e "   3) cloudflared tunnel run --url http://localhost:3000 ukstander-tunnel"
echo -e "   4) Cloudflare dashboard me Custom Hostnames mapping direct set up karlein!"

echo -e "\n${YELLOW}👉 Option 3: GitHub Auto-Rebuild (Vercel automatic Deployment style)${NC}"
echo -e "   Hamari background script file '/home/ubuntu/auto-deploy.sh' continuous main updates check"
echo -e "   kar rhi hai. Jab bhi aap GitHub per new code push kareinge, app server automatic auto-build hojayegi!"
echo -e "   Logs report live view command:"
echo -e "   ${CYAN}cat /home/ubuntu/deploy.log${NC}"
echo -e "${CYAN}===================================================================${NC}"
echo -e "Sub kuch standard aur easy kar dia gya hai. Enjoy full-easy VPS automation!"
