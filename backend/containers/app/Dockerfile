FROM golang:1.17 as build
WORKDIR /var/task

RUN apt update \
 && apt install -y \
      imagemagick \
      libmagickwand-dev

RUN go install github.com/vektra/mockery/v2@latest \
 && go install github.com/cosmtrek/air@latest

COPY go.mod go.sum ./
RUN go mod download -x
COPY . .
RUN GO111MODULE=on GOOS=linux go build -ldflags="-s -w" -o build/api src/handlers/api/main.go \
 && GO111MODULE=on GOOS=linux go build -ldflags="-s -w" -o build/deletelgtm src/handlers/deletelgtm/main.go

ENTRYPOINT []

# ---------------------------

FROM golang:1.17
WORKDIR /var/task

RUN apt update \
 && apt install -y \
      imagemagick \
      libmagickwand-dev
COPY --from=build /var/task/src/static/ /var/task/src/static/
COPY --from=build /var/task/build/api /var/task/build/api
COPY --from=build /var/task/build/deletelgtm /var/task/build/deletelgtm

ENTRYPOINT []
