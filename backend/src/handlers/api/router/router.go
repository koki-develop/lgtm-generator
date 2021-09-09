package router

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	healthctrl "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers/health"
	imgsctrl "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers/images"
	lgtmsctrl "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers/lgtms"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers/middlewares/cors"
	rptsctrl "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers/reports"
	imgsrepo "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways/images"
	lgtmsrepo "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways/lgtms"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways/notifier"
	rptsrepo "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways/reports"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/infrastructures"
	imgsuc "github.com/kou-pg-0131/lgtm-generator/backend/src/usecases/images"
	lgtmsuc "github.com/kou-pg-0131/lgtm-generator/backend/src/usecases/lgtms"
	rptsuc "github.com/kou-pg-0131/lgtm-generator/backend/src/usecases/reports"
)

func withContext(h func(ctx controllers.Context)) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		h(infrastructures.NewContextFromGin(ctx))
	}
}

func New() *gin.Engine {
	r := gin.Default()

	s := infrastructures.NewSlackClient(&infrastructures.SlackClientConfig{
		AccessToken: os.Getenv("SLACK_ACCESS_TOKEN"),
		HTTPAPI:     http.DefaultClient,
	})
	rdr := infrastructures.NewRenderer(&infrastructures.RendererConfig{SlackAPI: s})
	imgse := infrastructures.NewGoogleImageSearchEngine(&infrastructures.GoogleImageSearchEngineConfig{
		APIKey:         os.Getenv("GOOGLE_API_KEY"),
		SearchEngineID: os.Getenv("GOOGLE_CUSTOM_SEARCH_ENGINE_ID"),
	})
	db := infrastructures.NewGureguDynamoDB()
	s3lgtms := infrastructures.NewS3(&infrastructures.S3Config{
		Bucket: fmt.Sprintf("lgtm-generator-backend-%s-lgtms", os.Getenv("STAGE")),
	})
	lgtmgen := infrastructures.NewLGTMGenerator()

	n := notifier.New(&notifier.Config{
		Slack:       s,
		Channel:     fmt.Sprintf("lgtm-generator-backend-%s-reports", os.Getenv("STAGE")),
		FileStorage: s3lgtms,
	})
	lgtmsrepo := lgtmsrepo.NewRepository(&lgtmsrepo.RepositoryConfig{
		LGTMGenerator: lgtmgen,
		DynamoDB:      db,
		DBPrefix:      fmt.Sprintf("lgtm-generator-backend-%s", os.Getenv("STAGE")),
		FileStorage:   s3lgtms,
		HTTPAPI:       http.DefaultClient,
	})
	imgsrepo := imgsrepo.NewRepository(&imgsrepo.RepositoryConfig{
		ImageSearchEngine: imgse,
	})
	rptsrepo := rptsrepo.NewRepository(&rptsrepo.RepositoryConfig{
		DynamoDB: db,
		DBPrefix: fmt.Sprintf("lgtm-generator-backend-%s", os.Getenv("STAGE")),
	})

	lgtmsuc := lgtmsuc.NewUsecase(&lgtmsuc.UsecaseConfig{
		LGTMsRepository: lgtmsrepo,
	})
	imgsuc := imgsuc.NewUsecase(&imgsuc.UsecaseConfig{
		ImagesRepository: imgsrepo,
	})
	rptsuc := rptsuc.NewUsecase(&rptsuc.UsecaseConfig{
		ReportsRepository: rptsrepo,
		LGTMsRepository:   lgtmsrepo,
		Notifier:          n,
	})

	{
		cfg := &cors.Config{
			Renderer:     rdr,
			AllowOrigins: []string{},
			AllowMethods: []string{"GET", "POST", "OPTIONS"},
			AllowHeaders: []string{"Origin", "Content-Length", "Content-Type", "Accept-Encoding"},
		}
		stg := os.Getenv("STAGE")
		switch stg {
		case "local":
			cfg.AllowOrigins = []string{"http://localhost:3000"}
		case "dev":
			cfg.AllowOrigins = []string{"*"} // FIXME: 厳密に設定する
		default:
			panic(fmt.Sprintf("unknown stage: %s", stg))
		}
		cors := cors.New(cfg)
		r.Use(withContext(cors.Apply))
	}

	v1 := r.Group("/v1")
	{
		ctrl := healthctrl.NewController(&healthctrl.ControllerConfig{
			Renderer: rdr,
		})
		v1.GET("/h", withContext(ctrl.Standard))
	}
	{
		ctrl := imgsctrl.NewController(&imgsctrl.ControllerConfig{
			Renderer:      rdr,
			ImagesUsecase: imgsuc,
		})
		v1.GET("/images", withContext(ctrl.Search))
	}
	{
		ctrl := lgtmsctrl.NewController(&lgtmsctrl.ControllerConfig{
			Renderer:     rdr,
			LGTMsUsecase: lgtmsuc,
		})
		v1.GET("/lgtms", withContext(ctrl.Index))
		v1.POST("/lgtms", withContext(ctrl.Create))
	}
	{
		ctrl := rptsctrl.NewController(&rptsctrl.ControllerConfig{
			Renderer:       rdr,
			ReportsUsecase: rptsuc,
		})
		v1.POST("/reports", withContext(ctrl.Create))
	}

	return r
}
