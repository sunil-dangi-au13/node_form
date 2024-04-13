// routes/extractDeviceInfo.js

module.exports = function(req, res, next) {
    req.ipAddress = req.ip;
    req.deviceType = req.device.type;
    req.browser = req.headers['user-agent'];
    req.userAgent = req.headers['user-agent'];
    next();
};
