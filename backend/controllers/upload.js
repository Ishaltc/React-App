const cloudinary = require("cloudinary");
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    const files = Object.values(req.files).flat();
    let images = [];
    // going through all the files we have
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      // after removing from tmp folder
      removeTmp(file.tempFilePath)
    }
    res.json(images);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      // uploading file from tmp folder
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
            //removing image from tmp folder
          removeTmp(file.tempFilePath);
          return res
            .status(400)
            .json({ message: "Upload image failed", error: err });
        }
        resolve({
            //secure_url is image url which we upload into cloud storage.we pushing this url to image [] above
          url: res.secure_url,
        });
      }
    );
  });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
