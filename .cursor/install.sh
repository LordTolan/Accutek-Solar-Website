#!/usr/bin/env bash
# Idempotent development-environment bootstrap for the Accutek Solar app.
# Installs MongoDB (system dependency), Python backend deps, and Node frontend
# deps, and creates local .env files with dev defaults when missing.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# ---------------------------------------------------------------------------
# System dependencies: MongoDB 8.0 + python venv support
# ---------------------------------------------------------------------------
if ! command -v mongod >/dev/null 2>&1; then
  echo "Installing MongoDB 8.0..."
  curl -fsSL https://pgp.mongodb.com/server-8.0.asc \
    | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
  echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" \
    | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
  sudo apt-get update
  sudo apt-get install -y mongodb-org
fi

# python3.12-venv is required to create virtualenvs on Ubuntu 24.04.
sudo apt-get install -y python3.12-venv >/dev/null 2>&1 || true

sudo mkdir -p /data/db /var/log/mongodb
sudo chown -R "$(whoami)" /data/db /var/log/mongodb

# ---------------------------------------------------------------------------
# Backend (FastAPI)
# ---------------------------------------------------------------------------
cd "$REPO_ROOT/backend"
if [ ! -f .env ]; then
  echo "Creating backend/.env with dev defaults..."
  JWT="$(python3 -c 'import secrets; print(secrets.token_hex(32))')"
  cat > .env <<EOF
MONGO_URL=mongodb://127.0.0.1:27017
DB_NAME=accutek_solar
CORS_ORIGINS=*
JWT_SECRET=$JWT
ADMIN_EMAIL=admin@accuteksolar.com
ADMIN_PASSWORD=AdminDev123!
EOF
fi

python3 -m venv .venv
# shellcheck disable=SC1091
. .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
deactivate

# ---------------------------------------------------------------------------
# Frontend (Next.js)
# ---------------------------------------------------------------------------
cd "$REPO_ROOT/frontend"
if [ ! -f .env ]; then
  echo "Creating frontend/.env with dev defaults..."
  cat > .env <<EOF
REACT_APP_BACKEND_URL=http://localhost:8001
NEXT_PUBLIC_BACKEND_URL=http://localhost:8001
EOF
fi

npm install --legacy-peer-deps

echo "Install complete."
