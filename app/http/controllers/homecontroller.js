const { render } = require("ejs")
const Menu = require('../../models/menu')
function homecontroller(){
    //factory functions
    return {
        async index(req, res ) {
            const foowings =await  Menu.find()
            
            return res.render('home', {foowings: foowings})
            
            
        }
    }

}
module.exports = homecontroller