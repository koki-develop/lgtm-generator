package usecases

import (
	"testing"

	mocks "github.com/koki-develop/lgtm-generator/backend/mocks/src/adapters/gateways/iface"
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
	"github.com/stretchr/testify/assert"
)

type mocksForLGTMsUsecase struct {
	lgtmsUsecase    *LGTMsUsecase
	lgtmsRepository *mocks.LGTMsRepository
}

func (ms *mocksForLGTMsUsecase) AssertExpectations(t *testing.T) {
	ms.lgtmsRepository.AssertExpectations(t)
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
	t.Run("return nil", func(t *testing.T) {
		ipt := &entities.LGTMDeleteInput{ID: "00000000-0000-0000-0000-000000000000"}

		ms := buildMocksForLGTMsUsecase()
		ms.lgtmsRepository.On("Delete", ipt.ID).Return(nil)
		uc := ms.lgtmsUsecase

		err := uc.Delete(ipt)

		assert.NoError(t, err)
		ms.AssertExpectations(t)
	})
	t.Run("return error when failed to delete", func(t *testing.T) {
		ipt := &entities.LGTMDeleteInput{ID: "00000000-0000-0000-0000-000000000000"}

		ms := buildMocksForLGTMsUsecase()
		ms.lgtmsRepository.On("Delete", ipt.ID).Return(errors.New("SOMETHING_WRONG"))
		uc := ms.lgtmsUsecase

		err := uc.Delete(ipt)

		assert.EqualError(t, err, "SOMETHING_WRONG")
		ms.AssertExpectations(t)
	})
}
