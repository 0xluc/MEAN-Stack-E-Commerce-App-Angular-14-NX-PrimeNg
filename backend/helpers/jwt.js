const { expressjwt } = require('express-jwt');
require('dotenv/config');
function authJwt() {
    return expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256']
    });
}
module.exports = authJwt;
