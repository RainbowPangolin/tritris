# Use the official OpenJDK 11 as the base image
FROM adoptopenjdk/openjdk11:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle build files to the container
COPY build.gradle .
COPY settings.gradle .

# Copy the Gradle wrapper files to the container
COPY gradlew .
COPY gradle gradle

# Download and cache the dependencies
RUN ./gradlew dependencies

# Copy the application source code to the container
COPY src src

# Build the application
RUN ./gradlew build

# Specify the command to run the application
CMD ["java", "-jar", "build/libs/app.jar"]
