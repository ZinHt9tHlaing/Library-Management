import express, { Router, Request, Response } from "express";

export const ProductRouter: Router = express.Router();

ProductRouter.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ message: "OK" });
});
