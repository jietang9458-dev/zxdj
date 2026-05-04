# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 复制 package.json 和 npm install 缓存依赖
COPY package.json package-lock.json* ./
RUN npm install

# 复制全部代码并构建
COPY . .
RUN npm run build

# 运行阶段
FROM nginx:alpine

# 复制构建产物到 nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 覆盖 nginx 默认配置，以支持单页应用的路由
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
