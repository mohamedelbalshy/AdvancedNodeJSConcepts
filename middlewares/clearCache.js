const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
    await next(); // await next to be executed first (Query) then clear cache
    
    clearHash(req.user.id);
}