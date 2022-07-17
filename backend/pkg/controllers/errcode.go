package controllers

type ErrCode string

const (
	ErrCodeInvalidJSON            ErrCode = "INVALID_JSON"
	ErrCodeInvalidInput           ErrCode = "INVALID_INPUT"
	ErrCodeInvalidQuery           ErrCode = "INVALID_QUERY"
	ErrCodeUnsupportedImageFormat ErrCode = "UNSUPPORTED_IMAGE_FORMAT"

	ErrCodeForbidden ErrCode = "FORBIDDEN"

	ErrCodeInternalServerError ErrCode = "INTERNAL_SERVER_ERROR"
)
