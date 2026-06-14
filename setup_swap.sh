#!/bin/bash

# ==============================================================================
# UK Server 2: Oracle Cloud Infrastructure Auto Swap Provisioning Utility
# Target OS: Ubuntu 20.04 LTS
# Purpose: Allocates 2GB swap space to prevent build/DB out-of-memory triggers
# ==============================================================================

# Ensure the script is executed with root permissions
if [ "$EUID" -ne 0 ]; then
  echo "[-] CRITICAL: Please run this script with sudo access:"
  echo "    sudo bash setup_swap.sh"
  exit 1
fi

echo "[+] Starting UK Server 2 OCI Swap Configuration Panel..."
echo "--------------------------------------------------------"

# 1. Inspect existing active swap allocation
PRE_SWAP=$(swapon --show)
if [ ! -z "$PRE_SWAP" ]; then
  echo "[!] Existing Swap Detected:"
  echo "$PRE_SWAP"
  read -p "[?] Do you want to proceed and append/re-provision a new 2GB swap file? (y/N): " CONFIRM
  if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
    echo "[-] Swap provisioning aborted by user."
    exit 0
  fi
fi

# 2. Check current disk storage capacity
echo "[+] Checking drive space..."
FREE_SPACE_KB=$(df / | tail -1 | awk '{print $4}')
FREE_SPACE_GB=$((FREE_SPACE_KB / 1024 / 1024))

if [ "$FREE_SPACE_GB" -lt 3 ]; then
  echo "[!] WARNING: Storage space is low ($FREE_SPACE_GB GB free). We need at least 2.5GB."
  read -p "[?] Proceed anyway? (y/N): " SPACE_CONFIRM
  if [[ ! "$SPACE_CONFIRM" =~ ^[Yy]$ ]]; then
    echo "[-] Aborted due to storage precautions."
    exit 1
  fi
fi

# 3. Create raw blank file swap (fallocate is instant, dd is secondary fallback)
echo "[+] Creating 2GB empty swap file at /swapfile..."
fallocate -l 2G /swapfile
if [ $? -ne 0 ]; then
  echo "[*] Fallocate failed. Trying fallback raw dd allocation block transfer..."
  dd if=/dev/zero of=/swapfile bs=1M count=2048
fi

# 4. Restrict file permissions for root security
echo "[+] Tightening ownership permissions to Owner-Only (chmod 600)..."
chmod 600 /swapfile

# 5. Format to Linux Swap filesys signature
echo "[+] Invoking mkswap format routines..."
mkswap /swapfile

# 6. Bind swap file to secondary active memory pool
echo "[+] Activating new swapon device allocation..."
swapon /swapfile

# 7. Check if registered in fstab filesystem mount registry
echo "[+] Formatting persistent reboot mount configurations..."
grep -q '/swapfile' /etc/fstab
if [ $? -eq 0 ]; then
  echo "[*] Persistence registration already registered in /etc/fstab."
else
  echo '/swapfile swap swap defaults 0 0' >> /etc/fstab
  echo "[+] Persistence configuration declared in /etc/fstab successfully!"
fi

# 8. Tweak server swappiness for performance efficiency (standard recommended is 10 for servers)
echo "[+] Standardizing sysctl configurations (swappiness=10)..."
grep -q 'vm.swappiness' /etc/sysctl.conf
if [ $? -eq 0 ]; then
  sed -i 's/vm.swappiness.*/vm.swappiness=10/' /etc/sysctl.conf
else
  echo 'vm.swappiness=10' >> /etc/sysctl.conf
fi
sysctl -p

# 9. Verify success
echo "--------------------------------------------------------"
echo "[+] Swap configurations successfully finalized!"
echo "--------------------------------------------------------"
free -h
swapon --show
echo "--------------------------------------------------------"
echo "[*] DONE: Your Oracle Cloud instance is now equipped with 2GB swap memory!"
