FROM node:16

WORKDIR /app

COPY package*.json .

RUN npm install 
# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "production"]; \
#          then install; \
#          else npm install --only=production; \
#          fi        

COPY . . 

ENV PORT 3000

EXPOSE ${PORT}

CMD [ "node", "app.js" ]