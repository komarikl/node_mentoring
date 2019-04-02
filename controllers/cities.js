import Cities from '../models/cities'

const updateCheck = object =>
    Object.keys(object).reduce((obj, key) => {
        if (object[key] !== undefined) {
            obj[key] = object[key]
        }
        return obj
    }, {})

export const getCities = async (req, res, next) => {
    Cities.find({})
        .then(r => res.json(r))
        .catch(err => console.log(err))
}

export const addNewCity = async (req, res, next) => {
    const { name, capital, country, location } = req.body || {}
    const newCity = { name, capital, country, location }
    Cities.create(newCity)
        .then(r => res.json(r))
        .catch(err => console.log(err))
}

export const deleteCity = async (req, res, next) => {
    const { id: _id } = req.params
    Cities.findByIdAndRemove({ _id })
        .then(() => res.json({ result: 'Success!' }))
        .catch(err => console.log(err))
}

export const updateCity = async (req, res, next) => {
    const { id: _id } = req.params
    const { name, capital, country, location } = req.body || {}
    const newCity = { name, capital, country, location }
    Cities.findOne({ _id })
        .then(city => (city ? Cities.findOneAndUpdate({ _id }, updateCheck(newCity)) : Cities.create(newCity)))
        .then(r => res.json(r))
        .catch(err => console.log(err))
}
