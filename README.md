# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/alenzija/nodejs2024Q1-service.git
```

## Running application

```
docker-compose up --build
```

## Running only database

```
docker-compose up -d db
```

## Running only server

```
docker-compose up -d server
```

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/yaml-docs/ or http://localhost:4000/runtime-docs/. For more information about OpenAPI/Swagger please visit https://swagger.io/.

## DockerHub
https://hub.docker.com/repositories/alenzija219

## Testing

## Installing npm modules

```
npm install
```

After installing npm modules open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

## Installing npm modules

```
npm install
```

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
