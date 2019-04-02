import models from '../models/'

export const getUser = async (req, res, next) => {
    models.Users.findAll({ attributes: ['id', 'login', 'email'] })
        .then(users => {
            res.json(users)
        })
        .catch(err => console.log(err))
}
