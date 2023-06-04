import { Storage } from '@google-cloud/storage';

const config = require("../../config/gcs_config.json");

export const storage = new Storage({
  projectId: config.projectId,
  keyFilename: '../config/key_file.json',
});

export const bucketName = config.bucketName;
