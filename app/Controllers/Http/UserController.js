'use strict'
const User = use('App/Models/User')
class UserController {

    async login({auth,response,request}){
        const {email,password} =  request.all()
        try {
            await auth.attempt(email,password)
            return response.redirect('/')
        } catch (error) {
            console.log(error)
            return response.redirect('/login')
        }
    }

    async create({auth,response,request}){
        const user = await User.create(request.only(['username','email','password']))
        await auth.login(user) 
        return response.redirect('/')
    }


    async questions({view,auth}){
        
        const question = await auth.user.questions().fetch()
        return view.render('me/myQuestions',{questions: question.toJSON()})
    }

   

}


module.exports = UserController
