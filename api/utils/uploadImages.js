import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

// Get the directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported file format.",
      },
      false
    );
  }
};

export const productImgResize = async (req, res, next) => {
  if (!req.files) return next();

  await Promise.all(
    req.files.map(async (file) => {
      const outputPath = `public/images/products/${file.filename}`;

      // Ensure the destination directory exists
      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      // Resize and save the image
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);
    })
  );

  next();
};

export const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();

  await Promise.all(
    req.files.map(async (file) => {
      const outputPath = `public/images/blogs/${file.filename}`;

      // Ensure the destination directory exists
      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      try {
        // Resize and save the image
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(outputPath);
      } catch (error) {
        next(error);
      }
    })
  );

  next();
};

export const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
