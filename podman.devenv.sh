#!/bin/sh
exec podman run -it --rm -v .:/app --workdir /app -p '[::1]:3980:3980' -p '[::1]:24678:24678' node:18 sh -c 'yarn dev & exec bash'
