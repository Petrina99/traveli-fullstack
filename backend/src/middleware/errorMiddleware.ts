import { Response } from 'express'

export const errorHandler = (err: any, res: Response) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    res.status(statusCode);
  
    res.json({
      message: err.message,
    })
  }
  