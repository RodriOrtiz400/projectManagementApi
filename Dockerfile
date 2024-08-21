FROM public.ecr.aws/docker/library/node:18

RUN apk add --update --upgrade --no-cache tini \
  git \
  libc6-compat \
  build-base \
  python3 \
  make

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm ci --unsafe-perm=true
COPY . /app

RUN npm run build

EXPOSE 3000
