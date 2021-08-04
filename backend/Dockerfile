FROM golang:1.16-alpine3.13 as build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download -x
COPY . .
RUN GO111MODULE=on GOOS=linux go build -ldflags="-s -w" -o build/api src/handlers/api/main.go

FROM alpine:3.13
WORKDIR /app
COPY --from=build /app/build/api /app/build/api
