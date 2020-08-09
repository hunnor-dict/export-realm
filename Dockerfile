FROM node:12
COPY . /opt/export-realm
WORKDIR /opt/export-realm
RUN npm install
RUN npm install -g .
ENTRYPOINT ["hunnor-realm"]
