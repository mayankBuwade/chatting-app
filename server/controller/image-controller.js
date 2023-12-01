import mongoose from "mongoose";
import grid from "gridfs-stream";

const url = "http://localhost:8000";

const conn = mongoose.connection;
let gfs, gridFSBucket;

conn.once("open", () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadFile = async (request, response) => {
  if (!request.file) {
    return response.status(404).json("File not found");
  }

  const imageUrl = `${url}/file/${request.file.filename}`;

  return response.status(200).json(imageUrl);
};

export const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });
    const readStream = gridFSBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
