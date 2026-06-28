const { PrismaClint } = require('@prisma/client')

const prisma = new PrismaClint({
    log: process.NODE_ENV === "development"
    ? ["query" , "error" , "warn"]
    : ["error"],
});


const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("db connected via prisma");
    } catch (error) {
        console.log(`Database connection error : ${error.message}`);
        process.exit(1);
    }
}



const disconnectDB = async () => {
    await prisma.$disconnect(); 
}



export {prisma , connectDB , disconnectDB};