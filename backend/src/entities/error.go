package entities

type ErrCode string

const (
	ErrCodeInvalidJSON        ErrCode = "INVALID_JSON"
	ErrCodeInvalidContentType ErrCode = "INVALID_CONTENT_TYPE"
	ErrCodeInvalidBase64      ErrCode = "INVALID_BASE64"

	ErrCodeQueryIsEmpty       ErrCode = "QUERY_IS_EMPTY"
	ErrCodeContentTypeIsEmpty ErrCode = "CONTENT_TYPE_IS_EMPTY"
	ErrCodeBase64IsEmpty      ErrCode = "BASE64_IS_EMPTY"
	ErrCodeImageSourceIsEmpty ErrCode = "IMAGE_SOURCE_IS_EMPTY"

	ErrCodeInternalServerError ErrCode = "INTERNAL_SERVER_ERROR"
)
