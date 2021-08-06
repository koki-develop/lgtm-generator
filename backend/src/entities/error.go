package entities

import "errors"

type ErrCode string

const (
	ErrCodeUnsupportedImageFormat ErrCode = "UNSUPPORTED_IMAGE_FORMAT"

	ErrCodeInvalidParameter   ErrCode = "INVALID_PARAMETER"
	ErrCodeInvalidJSON        ErrCode = "INVALID_JSON"
	ErrCodeInvalidContentType ErrCode = "INVALID_CONTENT_TYPE"
	ErrCodeInvalidBase64      ErrCode = "INVALID_BASE64"
	ErrCodeInvalidReportType  ErrCode = "INVALID_REPORT_TYPE"

	ErrCodeQueryIsEmpty       ErrCode = "QUERY_IS_EMPTY"
	ErrCodeContentTypeIsEmpty ErrCode = "CONTENT_TYPE_IS_EMPTY"
	ErrCodeBase64IsEmpty      ErrCode = "BASE64_IS_EMPTY"
	ErrCodeImageSourceIsEmpty ErrCode = "IMAGE_SOURCE_IS_EMPTY"

	ErrCodeInternalServerError ErrCode = "INTERNAL_SERVER_ERROR"
)

var (
	ErrUnsupportedImageFormat = errors.New("unsupported image format")
	ErrInvalidReportType      = errors.New("invalid report type")
	ErrNotFound               = errors.New("not found")
	ErrInvalidParameter       = errors.New("invalid parameter")
)
