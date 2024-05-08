

export const createPost=async(req,res,next)=>{
    return res.status(201).send({
        success:true,
        msg:"Post created Successfully"
    })
}

