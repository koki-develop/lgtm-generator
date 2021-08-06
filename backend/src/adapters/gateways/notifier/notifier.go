package notifier

import "github.com/kou-pg-0131/lgtm-generator/backend/src/entities"

type Notifier struct {
	config *Config
}

type Config struct {
}

func New(cfg *Config) *Notifier {
	return &Notifier{config: cfg}
}

func (n *Notifier) NotifyReport(rpt *entities.Report) error {
	return nil
}
