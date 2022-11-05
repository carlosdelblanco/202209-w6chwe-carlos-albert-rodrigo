import type { Request, Response } from "express";

export const endPointUknown = (req: Request, res: Response) => {
  res.status(404).json({ message: "Error, Endpoint not found!" });
};
