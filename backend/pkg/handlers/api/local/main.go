package main

import "github.com/koki-develop/lgtm-generator/backend/pkg/router"

func main() {
	r := router.New()
	if err := r.Run(); err != nil {
		panic(err)
	}
}
