import express from 'express';


import { getProduits,createProduit, deleteProduit, updateProduit,getProduit } from '../controllers/products.js';

const router = express.Router();



router.get('/produit', getProduits);

router.post('/', createProduit);


router.get('/:id', getProduit);


router.delete('/:id', deleteProduit);


router.patch('/:id', updateProduit);

export default router