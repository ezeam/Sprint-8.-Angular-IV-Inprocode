// routes/sales.ts

import { Router, Request, Response, NextFunction } from 'express';
import * as SalesController from '../controllers/salesController';

const router = Router();

router.get('/sales', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sales = await SalesController.getSales();
    res.json(sales);
  } catch (err) {
    next(err);
  }
});

router.get('/sales/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sale = await SalesController.getSaleById(Number(req.params.id));
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).send('Sale not found');
    }
  } catch (err) {
    next(err);
  }
});

router.post('/sales', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sale = await SalesController.createSale(req.body);
    res.status(201).json(sale);
  } catch (err) {
    next(err);
  }
});

router.put('/sales/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [affectedCount, affectedRows] = await SalesController.updateSale(Number(req.params.id), req.body);
    if (affectedCount > 0) {
      res.json(affectedRows);
    } else {
      res.status(404).send('Sale not found');
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/sales/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await SalesController.deleteSale(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
