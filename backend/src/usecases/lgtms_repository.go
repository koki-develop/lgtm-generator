package usecases

import (
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
)

type LGTMsRepository interface {
	Find(id string) (*entities.LGTM, error)
}
