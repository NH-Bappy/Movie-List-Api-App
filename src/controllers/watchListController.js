const { prisma } = require("../config/db");



const addToWatchList = async (req , res) => {
    const { movieId , status , rating , notes , userId} = req.body;

    //verify movie exists
    const movie = await prisma.movie.findUnique({
        where: {id : movieId},
    });
    
    if (!movie) {
    return res.status(404).json({ error: "movie not found" });
    }

    // check if already exists
    const alreadyExists = await prisma.watchListItem.findUnique({
        where: {userId_movieId: {
            userId: userId,
            movieId: movieId,
        }},
    });

    if (alreadyExists) {
    return res.status(400).json({ message: "movie already in watch list" });
    }

//create watch list item
    const addMovie = await prisma.watchListItem.create({
        data: {
            userId,
            movieId,
            status: status || "PLANNED",
            rating: rating ?? null,
            notes: notes ?? null,
        },
    });

    res.status(201).json({
        status: "success",
        data: {
            addMovie,
        },
    });

};

module.exports = {addToWatchList};