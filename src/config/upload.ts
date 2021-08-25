import crypto from 'crypto';
import path from 'path';
import multer, { StorageEngine } from 'multer';
import AppError from '@shared/errors/AppError';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(tmpFolder, 'upload');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder,

  multer: {
    storage: multer.diskStorage({
      destination: uploadsFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname
          .replace(' ', '-')
          .replace(/[/\\:]/g, '_')}`;

        return callback(null, fileName);
      },
    }),
    limits: {
      fileSize: 8000000,
    },
    fileFilter: (request: any, file: any, callback: any) => {
      const formats = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'application/pdf',
      ];

      if (formats.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new AppError('Format not accepted'));
      }
    },
  },

  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as IUploadConfig;
