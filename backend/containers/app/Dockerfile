FROM golang:1.16 as build
WORKDIR /var/task

RUN apt update \
 && apt install -y \
      imagemagick \
      libmagickwand-dev
COPY go.mod go.sum ./
RUN go mod download -x
COPY . .
RUN GO111MODULE=on GOOS=linux go build -ldflags="-s -w" -o build/api src/handlers/api/main.go

ENTRYPOINT []

# ---------------------------

FROM golang:1.16
WORKDIR /var/task

RUN apt update \
 && apt install -y \
      imagemagick \
      libmagickwand-dev
COPY --from=build /var/task/src/static/ /var/task/src/static/
COPY --from=build /var/task/build/api /var/task/build/api

ENTRYPOINT []
