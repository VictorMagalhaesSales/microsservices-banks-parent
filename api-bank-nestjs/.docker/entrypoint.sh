#!/bin/bash

npm install
npm run typeorm migration:run
npm run console fixtures
npm run start:dev