#!/bin/sh -e
podman build -t localhost/velocemente .
exec podman run -it --rm -p '[::1]:3980:3980' localhost/velocemente
