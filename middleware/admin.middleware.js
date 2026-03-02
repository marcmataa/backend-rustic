export function AdminMiddleware (req, res, next){
   if (!req.user){
    return res.status(401).json({
        success: false,
        message: 'No autenticado, por favor inicie sesion'
    });
   }
   if(req.user.role === 'admin'){
    next()
   } else {
    res.status(403).json({
        success: false,
        message: "Accesso denegado: Se requiere el rol de administrador"
    });
   }
}