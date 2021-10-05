# Multi stage Build

# Primeiro estágio
FROM golang:1.17 AS stageOne

WORKDIR /app

COPY ./hello.go .

RUN go build hello.go

# Segundo estágio
FROM  scratch

COPY --from=stageOne /app/hello /

CMD ["./hello"]