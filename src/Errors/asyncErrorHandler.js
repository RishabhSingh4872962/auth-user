import createHttpError from "http-errors"



export const asyncErrorHandler =(func)=>{

    return async (req,res,next)=>{
        try {
            await func(req,res,next);
        } catch (error) {
          return  next(error)
        }
    }
}