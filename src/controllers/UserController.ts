import { Request } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/User";
import { USER_NOT_FOUND } from "../const";
import type { PostInput, PostLoginInput } from "../types/user";

export default class UserController {
  /**
   * POST: /
   */
  static post = asyncHandler(async (req: Request<any, any, PostInput>, res) => {
    const { password, ...restUser } = req.body;
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = new User({
      ...restUser,
      hash,
    });
    const data = await user.save();

    res.status(201).json({
      message: "User created successfully",
      data,
    });
  });

  /**
   * GET: /
   */
  static get = asyncHandler(async (req, res) => {
    const users = await User.find().sort({ role: "asc", last_name: "asc" });

    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
  });

  /**
   * GET: /:id
   */
  static getId = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const { hash, ..._user } = user.toJSON();
    res.status(200).json({
      message: "User found",
      data: _user,
    });
  });

  /**
   * POST: /login
   */
  static postLogin = asyncHandler(
    async (req: Request<any, any, PostLoginInput>, res) => {
      const { email, password } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) {
        res.status(404).json({
          message: USER_NOT_FOUND,
        });
        return;
      }

      const { hash } = user;
      const passwordCorrect = bcrypt.compareSync(password, hash);
      if (!passwordCorrect) {
        res.status(404).json({
          message: USER_NOT_FOUND,
        });
        return;
      }

      const { hash: h, ...userInfo } = user.toJSON();
      res.status(200).json({
        message: "User logged successfully",
        data: userInfo,
      });
    }
  );
}
