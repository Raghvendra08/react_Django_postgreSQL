# Build the Docker image
docker build -t frontend .

# Run the Docker container, mapping port 3000
docker run -d -p 3000:3000 frontend


# or To run without docker
npm i && npm start