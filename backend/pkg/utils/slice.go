package utils

import (
	"math/rand"
	"time"
)

func Shuffle[T any](s []T) {
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(s), func(i, j int) { s[i], s[j] = s[j], s[i] })
}
