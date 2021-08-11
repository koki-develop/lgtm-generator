package main

import (
	"github.com/kou-pg-0131/lgtm-generator/backend/src/handlers/api/router"
)

func main() {
	r := router.New()
	if err := r.Run(); err != nil {
		panic(err)
	}
}
