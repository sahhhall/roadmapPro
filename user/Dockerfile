FROM node:alpine


RUN npm install -g pnpm


WORKDIR /app


COPY package.json pnpm-lock.yaml ./


RUN pnpm install 


COPY . .


EXPOSE 3003 50051


CMD ["npm", "start"]
