package usecases

import (
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
)

type LGTMsRepository interface {
	Find(id string) (*entities.LGTM, error)
	FindAll(limit int64) (entities.LGTMs, error)
	FindAllAfter(id string, limit int64) (entities.LGTMs, error)
	CreateFromBase64(base64, contentType string) (*entities.LGTM, error)
	CreateFromURL(url string) (*entities.LGTM, error)
}
