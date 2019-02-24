import { users } from '../models/';

export const getUser = async (req, res) => {
  res.json(users);
};
