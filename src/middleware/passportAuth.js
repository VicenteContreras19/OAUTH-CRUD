

export const passportAuth = (req,res,next)=>{
    if(!req.isAuthenticated()) return res.sendStatus(401)
    next()
}