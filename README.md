Spring Boot + React + TailwindCSS + Docker + Postgres Web App for managing online bookings.

Steps to set up:

1.) Clone this repo to your local machine

2.) Once cloned, navigate your terminal to the backend/online_booking_app folder

3.) Run ./mvnw clean package to create an executable JAR file which Docker will use

4.) Navigate your terminal to the frontend/online-booking-ui folder

5.) Run npm build dev to install all required node modules

6.) Navigate your terminal to the root folder(where compose.yaml) is located

3.) Run "docker-compose build"

4.) Once all images have been built, run "docker-compose up"

5.) Your workspace should be set up and the UI accessible at http://localhost:5173/
