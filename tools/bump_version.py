#!/usr/bin/env python3
"""
tools/bump_version.py
Verhoogt het versienummer en werkt public/version.json bij.
Gebruik:
  python3 tools/bump_version.py patch
  python3 tools/bump_version.py minor
  python3 tools/bump_version.py major
"""

import sys
import os
import json
import subprocess
from datetime import datetime

VERSION_FILE = os.path.join(os.path.dirname(__file__), "..", "public", "version.json")

def get_git_info():
    try:
        short_sha = subprocess.check_output(["git", "rev-parse", "--short", "HEAD"], text=True).strip()
        full_sha = subprocess.check_output(["git", "rev-parse", "HEAD"], text=True).strip()
        branch = subprocess.check_output(["git", "rev-parse", "--abbrev-ref", "HEAD"], text=True).strip()
        return short_sha, full_sha, branch
    except Exception:
        return "local", "local", "main"

def main():
    part = sys.argv[1] if len(sys.argv) > 1 else "patch"
    
    with open(VERSION_FILE, "r") as f:
        data = json.load(f)

    cur_version = data.get("version", "1.0.0")
    parts = [int(p) for p in cur_version.split(".")]
    while len(parts) < 3:
        parts.append(0)

    if part == "major":
        parts[0] += 1
        parts[1] = 0
        parts[2] = 0
    elif part == "minor":
        parts[1] += 1
        parts[2] = 0
    else: # patch
        parts[2] += 1

    new_version = f"{parts[0]}.{parts[1]}.{parts[2]}"
    short_sha, full_sha, branch = get_git_info()

    data["version"] = new_version
    data["commit"] = short_sha
    data["fullCommit"] = full_sha
    data["buildTime"] = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
    data["branch"] = branch

    with open(VERSION_FILE, "w") as f:
        json.dump(data, f, indent=2)

    print(f"✅ Versie bijgewerkt naar: {new_version} ({short_sha})")

if __name__ == "__main__":
    main()
