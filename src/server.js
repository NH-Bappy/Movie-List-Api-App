const express = require('express');
require('dotenv').config();
const {prisma , connectDB , disconnectDB} = require('../src/config/db')
const movieRoutes = require('./routes/routeMovie');
const authRoutes = require('./routes/authRoutes')
const app = express();



// body parsing middleware to except json data from body
app.use(express.json())
// body parsing middleware to except json data from html of front-end
app.use(express.urlencoded({ extended: true }))







//Api routs
app.use("/cinema" , movieRoutes);
app.use("/auth" , authRoutes);

connectDB()

const PORT = 5001;
const server = app.listen(PORT , () => {
    console.log(`server running on ${PORT}` );
})


// handle unhandled promise rejection (e.g., database connection error)
process.on("unhandledRejection" , (error) => {
    console.error("unhandled Rejection" , error);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

//handle uncaught exceptions
process.on("uncaughtException" , async (error) => {
    console.error("Uncaught Exception" , error);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown 
process.on("SIGTERM" , async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});

