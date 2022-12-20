//auth middleware
import  jwt  from "jsonwebtoken" 



export default function isAuthenticated(req,res,next){
    if (!req.session.user) return res.sendStatus(401)

    next()
}

// export const jwtAuth =(req,res,next) => {
// try {
//      const {token}= req.cookies
//     const user = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = user

//     next()
// } catch (error) {
//     res.clearCookie('token')
//     res.sendStatus(401)
    
// }

// }