import Color from "../models/colorModel.js";
import { errorHandler } from "../utils/error.js";

export const createColor = async (req, res, next) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    next(error);
  }
};

export const updateColor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkId = await Color.findById(id);
    if (!checkId) return next(errorHandler(404, "Color not found!"));

    const updateColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateColor);
  } catch (error) {
    next(error);
  }
};

export const deleteColor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkId = await Color.findById(id);
    if (!checkId) return next(errorHandler(404, "Color not found!"));

    const deleteColor = await Color.findByIdAndDelete(id);
    res.json(deleteColor);
  } catch (error) {
    next(error);
  }
};

export const getColor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkId = await Color.findById(id);
    if (!checkId) return next(errorHandler(404, "Color not found!"));
    const getColor = await Color.findById(id);
    res.json(getColor);
  } catch (error) {
    next(error);
  }
};

export const getAllColor = async (req, res, next) => {
  try {
    const getAllColor = await Color.find();
    res.json(getAllColor);
  } catch (error) {
    next(error);
  }
};
