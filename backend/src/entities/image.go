package entities

type Image struct {
	Title string `json:"title"`
	URL   string `json:"url"`
}

type Images []*Image

type ImagesSearchInput struct {
	Query string `json:"q"`
}

func (ipt *ImagesSearchInput) IsValid() bool {
	if ipt.Query == "" {
		return false
	}
	return true
}
