import express from "express";
import type { Express, Router } from "express";

const router: Router = express.Router();

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

export default router;
