
const globalErrorHandler=async(err,req,res,next)=>{
    const errorStatusCode=err.statusCode || 500;
    const errorMessage=err.message ||"Internal Sever Error";
    return res.status(errorStatusCode).clearCookie("token").send({
        success:false,
        errorMessage
    })
}


export default globalErrorHandler