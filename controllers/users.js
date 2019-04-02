import Users from '../models/users'

export const getUser = async (req, res, next) => {
    Users.find({}, { password: 0 })
        .then(r => res.json(r))
        .catch(err => console.log(err))
}

export const deleteUser = async (req, res, next) => {
    const { id } = req.params
    Users.findByIdAndRemove({ _id: id })
        .then(() => res.json({ result: 'Success!' }))
        .catch(err => console.log(err))
}
