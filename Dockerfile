FROM node
ADD . .
WORKDIR generators/app/templates/
RUN npm install
CMD npm start
