#!/bin/sh

# Backend Spring Server tests
gradle test

# Switch into the frontend directory and run tests
cd ./app/src/main/resources/static
npm test