FROM eclipse-temurin:17

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle Wrapper files
COPY gradlew .
COPY gradle gradle

# Copy the build files
COPY app/build.gradle .
COPY settings.gradle .

# Resolve dependencies and cache them
RUN ./gradlew dependencies

# Copy the application source code to the container
COPY app/src src

# Build the application
RUN ./gradlew build

# Specify the command to run the application
CMD ["./gradlew", "bootRun"]
