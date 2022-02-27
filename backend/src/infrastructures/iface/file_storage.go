package iface

type FileStorage interface {
	Save(path, contentType string, data []byte) error
	IssueSignedURL(key string) (string, error)
	Delete(key string) error
}