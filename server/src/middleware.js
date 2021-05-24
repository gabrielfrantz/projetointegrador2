const jwt = require( 'jsonwebtoken')

module.exports = {
    checkToken(req, res, next) {
        let token = req.headers['x-access-token'] || req.headers['authorization']
    
        if (token) {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length)
            }
    
            jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
                if (err) {
                    console.log(token)
                    res.status(401).json({
                        success: false,
                        message: 'Token is not valid!'
                    });
                } else {
                    req.user = user
                    next()
                }
            })
        } else {
            res.status(500).json({
                success: false,
                message: 'Auth token is not supplied!'
            })
        }
    }
}