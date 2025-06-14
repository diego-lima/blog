#!/bin/bash
# Exit immediately if a command exits with a non-zero status.
set -e

echo "Building the website..."

# Run the astro build command using bun
bun run build

echo "Build complete. Output is in dist/" 