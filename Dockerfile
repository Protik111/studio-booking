FROM node:18-alpine

WORKDIR /usr/src/app

# Copy all files from the current directory to the container
COPY . .

# Install project dependencies
RUN yarn install

# Build the project
RUN yarn build

# Expose the app port
EXPOSE 5173

RUN ["chmod", "+x", "./entrypoint.sh"]

ENTRYPOINT [ "sh", "./entrypoint.sh" ]
