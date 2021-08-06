package lgtms

type Usecase struct {
	config *UsecaseConfig
}

type UsecaseConfig struct {
}

func NewUsecase(cfg *UsecaseConfig) *Usecase {
	return &Usecase{config: cfg}
}
