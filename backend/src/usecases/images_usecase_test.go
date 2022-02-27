package usecases

import (
	"testing"

	gwmocks "github.com/koki-develop/lgtm-generator/backend/mocks/src/adapters/gateways/iface"
	mocks "github.com/koki-develop/lgtm-generator/backend/mocks/src/adapters/gateways/iface"
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
	"github.com/stretchr/testify/assert"
)

type mocksForImagesUsecase struct {
	imagesUsecase    *ImagesUsecase
	imagesRepository *gwmocks.ImagesRepository
}

func (ms *mocksForImagesUsecase) AssertExpectations(t *testing.T) {
	ms.imagesRepository.AssertExpectations(t)
}

func buildMocksForImagesUsecase() *mocksForImagesUsecase {
	imgsrepo := &gwmocks.ImagesRepository{}
	imgsuc := &ImagesUsecase{
		config: &ImagesUsecaseConfig{
			ImagesRepository: imgsrepo,
		},
	}

	return &mocksForImagesUsecase{
		imagesUsecase:    imgsuc,
		imagesRepository: imgsrepo,
	}
}

func Test_NewImagesUsecase(t *testing.T) {
	t.Run("return ImagesUsecase", func(t *testing.T) {
		cfg := &ImagesUsecaseConfig{
			ImagesRepository: &mocks.ImagesRepository{},
		}
		uc := NewImagesUsecase(cfg)

		assert.NotNil(t, uc)
		assert.Equal(t, cfg.ImagesRepository, uc.config.ImagesRepository)
	})
}

func TestImagesUsecase_Search(t *testing.T) {
	t.Run("return nil", func(t *testing.T) {
		dummyimgs := entities.Images{
			{Title: "IMAGE_1", URL: "https://example.com/1"},
			{Title: "IMAGE_2", URL: "https://example.com/2"},
		}
		ipt := &entities.ImagesSearchInput{Query: "query"}

		ms := buildMocksForImagesUsecase()
		ms.imagesRepository.On("Search", ipt.Query).Return(dummyimgs, nil)
		uc := ms.imagesUsecase

		imgs, err := uc.Search(ipt)

		assert.Equal(t, dummyimgs, imgs)
		assert.NoError(t, err)
		ms.AssertExpectations(t)
	})
	t.Run("return error when input is invalid", func(t *testing.T) {
		ipt := &entities.ImagesSearchInput{Query: ""}

		ms := buildMocksForImagesUsecase()
		uc := ms.imagesUsecase

		imgs, err := uc.Search(ipt)

		assert.Nil(t, imgs)
		assert.True(t, errors.Is(err, entities.ErrInvalidParameter))
		ms.AssertExpectations(t)
	})
	t.Run("return error when failed to search images", func(t *testing.T) {
		ipt := &entities.ImagesSearchInput{Query: "query"}

		ms := buildMocksForImagesUsecase()
		ms.imagesRepository.On("Search", ipt.Query).Return(nil, errors.New("SOMETHING_WRONG"))
		uc := ms.imagesUsecase

		imgs, err := uc.Search(ipt)

		assert.Nil(t, imgs)
		assert.True(t, errors.Is(err, entities.ErrUnexpected))
		ms.AssertExpectations(t)
	})
}
