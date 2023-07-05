const { expressjwt } = require('express-jwt');
require('dotenv/config');
function authJwt() {
    const api = process.env.API_URL
    return expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`
        ]
    })
}

async function isRevoked(req, token) {
    try{
        if(!token.payload.isAdmin){
            return true
        }
        return false
    } catch (error){
        console.log(error)
        return true
    }
}
module.exports = authJwt;
