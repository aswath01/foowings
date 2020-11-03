const homecontroller = require('../app/http/controllers/homecontroller')
const authcontroller = require('../app/http/controllers/authcontroller')
const cartcontroller = require('../app/http/controllers/customer/cartcontroller')

function initRoutes(app){
 

    app.get('/',homecontroller().index)
  
    
    app.get('/login',authcontroller().login)

    app.get('/registration',authcontroller().registration)
    app.get('/cart', cartcontroller().index)
    app.post('/update-cart', cartcontroller().update)
}
module.exports = initRoutes