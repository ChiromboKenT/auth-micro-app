import {Request, Response, NextFunction} from "express";
import {Schema} from "joi";
import {AppError} from "../utils/appError";

export const requestValidator = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const {error} = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      throw new AppError(errorMessage, 400);
    }
    next();
  };
};
