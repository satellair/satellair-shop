import express from "express";
import type { Express, Router } from "express";

const router: Router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

export default router;
