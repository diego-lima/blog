#!/bin/bash
# Exit immediately if a command exits with a non-zero status.
set -e

echo "Deploying the website to pico.sh..."

# -r: recursive (copy directories)
# -v: verbose (show what's being transferred)
# --delete: delete files on the destination that don't exist on the source
# The trailing slash on `dist/` is important to copy the contents of the directory.
# The trailing slash on `pgs.sh:/blog/` is important to ensure files are copied into the `blog` directory.
rsync -rv --delete dist/ pgs.sh:/blog/

echo "Deployment complete." 