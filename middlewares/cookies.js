export default async(req, res, next) => {
    req.parsedCookies = req.cookies
    console.log('parsedCookies: ', req.parsedCookies)
    next()
};
