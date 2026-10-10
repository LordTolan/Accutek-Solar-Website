#!/usr/bin/env bash
# Per-boot startup: ensure MongoDB is running before the app terminals start.
set -euo pipefail

sudo mkdir -p /data/db /var/log/mongodb
sudo chown -R "$(whoami)" /data/db /var/log/mongodb 2>/dev/null || true

if mongosh --quiet --eval 'db.runCommand({ ping: 1 })' >/dev/null 2>&1; then
  echo "MongoDB already running."
else
  echo "Starting MongoDB..."
  mongod --dbpath /data/db --bind_ip 127.0.0.1 --port 27017 \
    --fork --logpath /var/log/mongodb/mongod.log

  for _ in $(seq 1 30); do
    if mongosh --quiet --eval 'db.runCommand({ ping: 1 })' >/dev/null 2>&1; then
      echo "MongoDB is ready."
      break
    fi
    sleep 1
  done
fi
