FROM public.ecr.aws/lambda/provided:al2 as build
WORKDIR /app

RUN yum -y update \
 && yum -y install \
      golang \
      ImageMagick \
      ImageMagick-devel

COPY go.mod go.sum ./
RUN go mod download -x
COPY . .
RUN GO111MODULE=on GOOS=linux go build -ldflags="-s -w" -o build/api src/handlers/api/main.go
ENTRYPOINT []

# ---------------------------

FROM public.ecr.aws/lambda/provided:al2
WORKDIR /app

COPY --from=build /usr/lib64/ /usr/lib64/
COPY --from=build /app/src/static/ /app/src/static/
COPY --from=build /app/build/api /app/build/api

ENTRYPOINT []
