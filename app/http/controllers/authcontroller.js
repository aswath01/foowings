const { render } = require("ejs")
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../../models/user')
function authcontroller(){
    //factory functions
    return {
        login(req, res ) {
            
                res.render('auth/login')

        },
        postLogin(req,res,next){
            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error',info.message)
                    return res.redirect('/login')
                }
                req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                })

            })(req,res,next)

        },
        registration(req,res){
            res.render('auth/registration')
        
        },
        async postRegistration(req, res) {
         

            
            const { name, email, password }   = req.body
            // Validate request 
            if(!name || !email || !password) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
               return res.redirect('/registration')
            }
   
            // Check if email exists 
            User.exists({ email: email }, (err, result) => {
                if(result) {
                   req.flash('error', 'Email already taken')
                   req.flash('name', name)
                   req.flash('email', email) 
                   return res.redirect('/registration')
                }
            })
   
            // Hash password 
            const hashedPassword = await bcrypt.hash(password, 10)
            // Create a user 
            const user = new User({
                name,
                email,
                password: hashedPassword
            })
   
            user.save().then((user) => {
               // Login
               return res.redirect('/')
            }).catch(err => {
               req.flash('error', 'Something went wrong')
                   return res.redirect('/registration')
                   console.log(req.body)
            })
           },
           logout(req, res) {
             req.logout()
             return res.redirect('/')  



     /*   registration(req, res){
            res.render('auth/registration')
        },
        postRegistration(req, res){

            const {firstname,lastname,password,city} = req.body

            console.log(req.body);*/
            
        }
    }

}
module.exports = authcontroller