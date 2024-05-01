FROM golang:1.21-alpine3.18


WORKDIR /app 


COPY go.* ./


RUN go mod download


RUN apk update
RUN apk add curl
RUN cd / && curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s
RUN rm -rf /var/cache/apk/*

CMD ["air", "-c", ".air.toml"]

