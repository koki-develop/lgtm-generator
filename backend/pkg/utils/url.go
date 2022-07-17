package utils

import "net/url"

func IsHTTPSURL(href string) bool {
	u, err := url.ParseRequestURI(href)
	if err != nil {
		return false
	}
	return u.Scheme == "https"
}

func IsURL(str string) bool {
	_, err := url.ParseRequestURI(str)
	return err == nil
}
