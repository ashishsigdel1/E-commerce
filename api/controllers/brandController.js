import Brand from "../models/brandModel.js";
import { errorHandler } from "../utils/error.js";

export const createBrand = async (req, res, next) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    next(error);
  }
};

export const updateBrand = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkId = await Brand.findById(id);
    if (!checkId) return next(errorHandler(404, "Brand not found!"));

    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBrand);
  } catch (error) {
    next(error);
  }
};

export const deleteBrand = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkId = await Brand.findById(id);
    if (!checkId) return next(errorHandler(404, "Brand not found!"));

    const deleteBrand = await Brand.findByIdAndDelete(id);
    res.json(deleteBrand);
  } catch (error) {
    next(error);
  }
};

export const getBrand = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkId = await Brand.findById(id);
    if (!checkId) return next(errorHandler(404, "Brand not found!"));
    const getBrand = await Brand.findById(id);
    res.json(getBrand);
  } catch (error) {
    next(error);
  }
};

export const getAllBrand = async (req, res, next) => {
  try {
    const getAllBrand = await Brand.find();
    res.json(getAllBrand);
  } catch (error) {
    next(error);
  }
};
