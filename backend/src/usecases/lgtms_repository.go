package usecases

import (
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
)

type LGTMsRepository interface {
	Find(id string) (*entities.LGTM, error)
	FindAll() (entities.LGTMs, error)
	FindAllAfter(id string) (entities.LGTMs, error)
	Create(src []byte, contentType string) (*entities.LGTM, error)
}
