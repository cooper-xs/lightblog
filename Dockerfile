FROM node:18.15.0

WORKDIR /app/

COPY lightblog-be/package.json ./
COPY lightblog-be/node_modules ./node_modules
COPY lightblog-be/dist ./dist

CMD npm run start