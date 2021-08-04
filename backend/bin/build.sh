#!/bin/bash -eu

	export GO111MODULE=on
	export GOARCH=amd64
  export GOOS=linux

  go build -ldflags="-s -w" -o build/api src/handlers/api/main.go
