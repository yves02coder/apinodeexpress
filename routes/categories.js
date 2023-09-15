import express from 'express';


import { getCategories,createCategories, deleteCategorie, updateCategories,getCategorie } from '../controllers/categories.js';


const router = express.Router();



router.get('/', getCategories);

router.post('/', createCategories);


router.get('/:id', getCategorie);


router.delete('/:id', deleteCategorie);


router.patch('/:id', updateCategories);

export default router