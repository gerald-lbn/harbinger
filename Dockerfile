FROM golang:1.26.0-alpine AS builder
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o harbinger ./cmd/harbinger/main.go

FROM scratch
COPY --from=builder /app/harbinger /harbinger

ENTRYPOINT ["/harbinger"]
