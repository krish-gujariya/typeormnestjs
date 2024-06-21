import { extname } from 'path';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { catchError } from 'src/helper/genralFunction';


// Multer upload options
export const multerOptions =(foldername:string)=>{
    return  {
        // Enable file size limits
        limits: {
            fieldNameSize: 50,
            fieldSize: 20000,
          },
        // Check the mimetypes to allow for upload
        fileFilter: (req: any, file: any, cb: any) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                // Allow storage of file
                cb(null, true);
            } else {
                // Reject file
                cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
            }
        },
        // Storage properties
        storage: diskStorage({
            // Destination storage path details
            destination: (req: any, file: any, cb: any) => {
                const uploadPath = `uploads/${foldername}`;
                // Create folder if doesn't exist
                if (!existsSync(uploadPath)) {
                    mkdirSync(uploadPath);
                }
                cb(null, uploadPath);
            },
            // File modification details
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
              },
        }),
    };
}

export const deleteFile = (path?: string) => {
    try {
      unlinkSync(path as string);
    } catch (error) {
      return catchError(error);
    }
  };
  