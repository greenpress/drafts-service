FROM node:14.5.0 as ts-build
COPY . .
ENV NODE_ENV=development
RUN npm install
RUN npm run build

FROM ts-build
COPY dist package.json package-lock.json ./
ENV PORT=9005
EXPOSE $PORT
ENV NODE_ENV=production
RUN npm install
CMD npm start
