import {Request, Response} from "express";
import {asyncHandler} from "../utils/asyncHandler";
import { authService } from "../services/AuthService";


export const signup = asyncHandler(async (req: Request, res: Response) => {
  const {user, token} = await authService.signup(req.body);
  res.status(201).json({user, token});
});

export const signin = asyncHandler(async (req: Request, res: Response) => {
  const {email, password} = req.body;
  const {user, token} = await authService.signin(email, password);
  res.json({user, token});
});
