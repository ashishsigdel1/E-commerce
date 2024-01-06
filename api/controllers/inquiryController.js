import Inquiry from "../models/inquiryModel.js";
import { errorHandler } from "../utils/error.js";

export const createInquiry = async (req, res, next) => {
  try {
    const newInquiry = await Inquiry.create(req.body);
    res.json(newInquiry);
  } catch (error) {
    next(error);
  }
};

export const updateInquiry = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkId = await Inquiry.findById(id);
    if (!checkId) return next(errorHandler(404, "Inquiry not found!"));

    const updateInquiry = await Inquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateInquiry);
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkId = await Inquiry.findById(id);
    if (!checkId) return next(errorHandler(404, "Inquiry not found!"));

    const deleteInquiry = await Inquiry.findByIdAndDelete(id);
    res.json(deleteInquiry);
  } catch (error) {
    next(error);
  }
};

export const getInquiry = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkId = await Inquiry.findById(id);
    if (!checkId) return next(errorHandler(404, "Inquiry not found!"));
    const getInquiry = await Inquiry.findById(id);
    res.json(getInquiry);
  } catch (error) {
    next(error);
  }
};

export const getAllInquiry = async (req, res, next) => {
  try {
    const getAllInquiry = await Inquiry.find();
    res.json(getAllInquiry);
  } catch (error) {
    next(error);
  }
};
