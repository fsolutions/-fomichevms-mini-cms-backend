# Run docker with MongoDB
docker run -p 27017:27017 --name mongodb mongo

# If you need run GUI client for MongoDB
docker run -p 3000:3000 --name mongoclient mongoclient/mongoclient               