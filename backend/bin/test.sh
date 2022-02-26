#!/bin/bash

set -euo pipefail

go test -cover ./src/... -coverprofile cover.out
go tool cover -html=cover.out -o cover.html
