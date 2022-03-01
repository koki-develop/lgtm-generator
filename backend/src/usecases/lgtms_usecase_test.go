package usecases

import (
	"testing"

	mocks "github.com/koki-develop/lgtm-generator/backend/mocks/src/adapters/gateways/iface"
	"github.com/stretchr/testify/assert"
)

type mocksForLGTMsUsecase struct {
	lgtmsUsecase    *LGTMsUsecase
	lgtmsRepository *mocks.LGTMsRepository
}

func buildMocksForLGTMsUsecase() *mocksForLGTMsUsecase {
	lgtmsrepo := &mocks.LGTMsRepository{}
	lgtmsuc := &LGTMsUsecase{config: &LGTMsUsecaseConfig{
		LGTMsRepository: lgtmsrepo,
	}}
	return &mocksForLGTMsUsecase{
		lgtmsUsecase:    lgtmsuc,
		lgtmsRepository: lgtmsrepo,
	}
}

func Test_NewLGTMsUsecase(t *testing.T) {
	t.Run("return LGTMsUsecase", func(t *testing.T) {
		cfg := &LGTMsUsecaseConfig{
			LGTMsRepository: &mocks.LGTMsRepository{},
		}
		uc := NewLGTMsUsecase(cfg)

		assert.NotNil(t, uc)
		assert.Equal(t, cfg.LGTMsRepository, uc.config.LGTMsRepository)
	})
}

func TestLGTMsUsecase_FindAll(t *testing.T) {
	t.Skip()
}

func TestLGTMsUsecase_Create(t *testing.T) {
	t.Skip()
}

func TestLGTMsUsecase_Delete(t *testing.T) {
	t.Skip()
}
