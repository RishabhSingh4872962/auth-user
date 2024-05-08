import createHttpError from "http-errors"


export const asyncErrorHandler =async(func)=>{

    return async (req,res,next)=>{
        try {
            await func(req,res,next);
        } catch (error) {
            next(createHttpError(500,"Internal Server Error"))
        }
    }
}