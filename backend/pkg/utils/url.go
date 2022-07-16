package utils

import "net/url"

func IsHTTPS(href string) bool {
	u, err := url.ParseRequestURI(href)
	if err != nil {
		return false
	}
	return u.Scheme == "https"
}
