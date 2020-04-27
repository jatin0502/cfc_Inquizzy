FROM node:8.11.1

ADD public /app/public
ADD package.json /app
ADD server /app/server
ADD src /app/src

WORKDIR /app
RUN npm install --no-optional && npm cahe clean --force

ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

CMD [ "npm", "run start-client" ]
CMD [ "npm", "run start-server" ]