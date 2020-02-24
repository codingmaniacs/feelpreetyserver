// server/routes/user.js
const userscontroller = require('../../controllers/main/user.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {

    router
        .route('/users/register')
        .post(userscontroller.register)
     
    router
        .route('/users/login')
        .post(userscontroller.login)
     
    router
        .route('/users/me', )
        .get(userscontroller.me)
}