export default async (req, res, next) => {
    req.parsedQuery = req.query
    console.log('parsedQuery: ', req.parsedQuery)
    next()
}
