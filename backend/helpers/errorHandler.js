function errorHandler(err, req, res, next) {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        return res.status(err.status || 401).json({error: "Unauthorized"})
    }
    if(err.name === 'ValidationError'){
        return res.status(401).json({error: err.message})
    }
    return res.status(500).json({error: err.message})
}
module.exports = errorHandler