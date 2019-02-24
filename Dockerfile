FROM library/node:10-alpine
RUN npm install -g @angular/cli
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 4200/tcp
CMD ng serve --host 0.0.0.0
