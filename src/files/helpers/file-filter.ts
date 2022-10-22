import { Request } from "express";

export const fileFilter = (req: Request, file: Express.Multer.File, callBack: Function) => {

  if( !file ) return callBack(new Error('File is empty'), false)

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg','png', 'jpeg', 'gif'];

  if(validExtensions.includes(fileExtension)){
    return callBack(null, true)
  }

  return callBack(null, false);
}