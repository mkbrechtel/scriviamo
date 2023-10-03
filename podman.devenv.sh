#!/bin/sh
exec podman run -it --rm -v .:/app --workdir /app -p '[::1]:3980:3980' node:18 sh -c 'yarn dev & exec bash'
