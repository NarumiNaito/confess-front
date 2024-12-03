FROM node:18.16.0-slim

# WORKDIR /usr/app

FROM base AS test-and-build
COPY . /workspace
WORKDIR /workspace

ENV CHOKIDAR_USEPOLLING=true
ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

RUN npm run build

RUN ["npm", "run" , "start"]