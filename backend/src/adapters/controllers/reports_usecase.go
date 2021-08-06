package controllers

import "github.com/kou-pg-0131/lgtm-generator/backend/src/entities"

type ReportsUsecase interface {
	Create(ipt *entities.ReportCreateInput) (*entities.Report, error)
}
