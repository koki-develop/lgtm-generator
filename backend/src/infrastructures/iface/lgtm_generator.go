package iface

type LGTMGenerator interface {
	Generate(src []byte) ([]byte, error)
}
