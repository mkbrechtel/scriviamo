#!/bin/sh
exec podman run -it --rm -v .:/mnt/velocemente --workdir /mnt/velocemente -p 5173:5173 node:18 sh -c 'yarn dev --host 0.0.0.0 & exec bash'
