#!/bin/sh
gradle test

# Change into the frontend directory and run tests
cd ./app/src/main/resources/static
npm test