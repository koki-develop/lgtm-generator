package gateways

type LGTMGenerator interface {
	Generate(src []byte) ([]byte, error)
}
