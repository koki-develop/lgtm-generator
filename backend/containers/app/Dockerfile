FROM lambci/lambda:build-go1.x as build
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download -x
COPY . .
RUN GO111MODULE=on GOOS=linux go build -ldflags="-s -w" -o build/api src/handlers/api/main.go
ENTRYPOINT []

# ---------------------------

FROM lambci/lambda:build-go1.x
WORKDIR /var/task

COPY --from=build /app/src/static/ /app/src/static/
COPY --from=build /app/build/api /app/build/api

ENTRYPOINT []
