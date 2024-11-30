FROM node:alpine


RUN npm install -g pnpm


WORKDIR /app


COPY package.json pnpm-lock.yaml ./


RUN pnpm install 


COPY . .


EXPOSE 3005


CMD ["npm", "start"]
