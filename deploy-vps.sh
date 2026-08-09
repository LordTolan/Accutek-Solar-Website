#!/bin/bash
# Accutek Solar Website — VPS Deploy Script
# Run from: /docker/Accutek-Solar-Web/
set -euo pipefail

echo "[1/3] Pulling latest code..."
git pull origin main

echo "[2/3] Building and starting containers..."
docker compose -f docker-compose.website.yml up -d --build

echo "[3/3] Status check..."
sleep 5
docker ps --filter "name=accutek-web" --format "table {{.Names}}\t{{.Status}}"
echo ""
echo "Frontend: http://localhost:3001"
echo "Backend:  http://localhost:8010/docs"
echo ""
echo "Public URLs (after DNS propagates):"
echo "  https://new.accuteksolar.com"
echo "  https://api-new.accuteksolar.com/docs"
