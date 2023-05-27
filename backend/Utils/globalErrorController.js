
module.exports = (err , req,res,next)=>{
  if(process.env.NODE_ENV === "development"){
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack : err.stack,
      error: err
    })
  }else if(process.env.NODE_ENV === "production") {
    if(err.isOperational){
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      })
    }else{
      res.status(500).json({
        status: "error",
        message: "Something went very wrong"
      })
    }
  }
}