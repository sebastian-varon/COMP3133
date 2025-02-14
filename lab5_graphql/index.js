const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { ApolloServer } = require("apollo-server-express");

// Import schema and resolvers
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

dotenv.config();

// MongoDB Connection
const mongodb_atlas_url = process.env.MONGODB_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_atlas_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

// Initialize Apollo Server
const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); // Ensure the server starts before applying middleware
  server.applyMiddleware({ app });

  // Start the Express Server
  app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀 GraphQL Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
    connectDB();
  });
};

startServer();