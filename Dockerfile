FROM node:20-alpine AS builder

# 安装编译 better-sqlite3 必需的依赖
RUN apk add --no-cache python3 make g++

WORKDIR /app

# 复制依赖定义并安装
COPY package.json package-lock.json* ./
RUN npm install

# 复制全部代码并构建前端
COPY . .
RUN npm run build

# 运行阶段
FROM node:20-alpine

WORKDIR /app

# 从 builder 阶段复制整个 /app 目录（包含 node_modules 和 dist 等内容）
COPY --from=builder /app /app

ENV NODE_ENV=production

# AI Studio 和此项目默认监听 3000 端口
EXPOSE 3000

# 启动 Express 后端服务（这也会同时提供 dist/ 目录下的前端静态内容）
CMD ["npm", "run", "start"]
