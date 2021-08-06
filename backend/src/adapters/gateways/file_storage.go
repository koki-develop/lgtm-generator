package gateways

type FileStorage interface {
	Save(path, contentType string, data []byte) error
}
