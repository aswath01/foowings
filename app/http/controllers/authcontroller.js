const { render } = require("ejs")

function authcontroller(){
    //factory functions
    return {
        login(req, res ) {
            
                res.render('auth/login')

        },
        registration(req, res){
            res.render('auth/registration')
        }
    }

}
module.exports = authcontroller