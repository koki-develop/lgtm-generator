package infrastructures

import (
	"math"
	"strings"

	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
	"gopkg.in/gographics/imagick.v2/imagick"
)

const maxSideLength float64 = 425

type LGTMGenerator struct{}

func NewLGTMGenerator() *LGTMGenerator {
	return &LGTMGenerator{}
}

func (g *LGTMGenerator) Generate(src []byte) ([]byte, error) {
	imagick.Initialize()
	defer imagick.Terminate()

	tmp := imagick.NewMagickWand()
	defer tmp.Destroy()
	if err := tmp.ReadImageBlob(src); err != nil {
		if strings.HasPrefix(err.Error(), "ERROR_MISSING_DELEGATE") {
			return nil, errors.WithStack(entities.ErrUnsupportedImageFormat)
		}
		return nil, errors.WithStack(err)
	}
	w := tmp.GetImageWidth()
	h := tmp.GetImageHeight()
	dw, dh := g.calcImageSize(float64(w), float64(h))
	ttlfs, txtfs := g.calcFontSize(dw, dh)

	ttl := imagick.NewDrawingWand()
	txt := imagick.NewDrawingWand()
	if err := ttl.SetFont("src/static/fonts/Archivo_Black/ArchivoBlack-Regular.ttf"); err != nil {
		return nil, errors.WithStack(err)
	}
	if err := txt.SetFont("src/static/fonts/Archivo_Black/ArchivoBlack-Regular.ttf"); err != nil {
		return nil, errors.WithStack(err)
	}
	pw := imagick.NewPixelWand()
	if ok := pw.SetColor("#ffffff"); !ok {
		return nil, errors.New("invalid color")
	}
	bw := imagick.NewPixelWand()
	if ok := bw.SetColor("#000000"); !ok {
		return nil, errors.New("invalid color")
	}
	ttl.SetStrokeColor(bw)
	txt.SetStrokeColor(bw)
	ttl.SetStrokeWidth(1)
	txt.SetStrokeWidth(0.8)
	ttl.SetFillColor(pw)
	txt.SetFillColor(pw)
	ttl.SetFontSize(ttlfs)
	txt.SetFontSize(txtfs)
	ttl.SetGravity(imagick.GRAVITY_CENTER)
	txt.SetGravity(imagick.GRAVITY_CENTER)
	ttl.Annotation(0, 0, "L G T M")
	txt.Annotation(0, ttlfs/1.5, "L o o k s   G o o d   T o   M e")

	aw := tmp.CoalesceImages()
	defer aw.Destroy()

	mw := imagick.NewMagickWand()
	mw.SetImageDelay(tmp.GetImageDelay())
	defer mw.Destroy()

	for i := 0; i < int(aw.GetNumberImages()); i++ {
		aw.SetIteratorIndex(i)
		img := aw.GetImage()
		img.AdaptiveResizeImage(uint(dw), uint(dh))
		if err := img.DrawImage(ttl); err != nil {
			return nil, errors.WithStack(err)
		}
		if err := img.DrawImage(txt); err != nil {
			return nil, errors.WithStack(err)
		}
		if err := mw.AddImage(img); err != nil {
			return nil, errors.WithStack(err)
		}
		img.Destroy()
	}

	return mw.GetImagesBlob(), nil
}

func (g *LGTMGenerator) calcImageSize(w, h float64) (float64, float64) {
	if w > h {
		return maxSideLength, maxSideLength / w * h
	}
	return maxSideLength / h * w, maxSideLength
}

func (g *LGTMGenerator) calcFontSize(w, h float64) (float64, float64) {
	return math.Min(h/2, w/6), math.Min(h/9, w/27)
}
