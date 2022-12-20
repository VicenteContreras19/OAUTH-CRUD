//creating middleware
export default function logger(req,res,next){
    console.log(req.method, req.path)
    console.log(req.sessionID)
    req.user && console.log(req.user)

    next()
}


