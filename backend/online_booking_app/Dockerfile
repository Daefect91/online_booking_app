# Use the image pulled for openjdk 25
FROM openjdk:25-jdk

# Set the location of the compiled jar file
ARG JAR_FILE=target/*.jar

# Copy the jar file to the container
COPY ${JAR_FILE} online_booking_app.jar

COPY docker.env ./.env

# Run the application
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-jar","/online_booking_app.jar"]