import express from 'express';
import { checkToken } from '../middlewares';
import * as CitiesController from '../api/controllers/cities';

const router = express.Router();

router.get('/api/cities', checkToken, CitiesController.getCities);
router.post('/api/cities', checkToken, CitiesController.addNewCity);
router.put('/api/cities/:id', checkToken, CitiesController.updateCity);
router.delete('/api/cities/:id', checkToken, CitiesController.deleteCity);

export default router;
