module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode ||500;
    res.statusCode(err.statusCode).json({
       success:false,
       message:err.message 
    })
} 