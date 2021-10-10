package controllers

import "github.com/koki-develop/lgtm-generator/backend/src/entities"

type ReportsUsecase interface {
	Create(ipt *entities.ReportCreateInput) (*entities.Report, error)
}
