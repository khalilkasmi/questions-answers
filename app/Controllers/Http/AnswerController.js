'use strict'
const Answer = use('App/Models/Answer')
const Question = use('App/Models/Question')
class AnswerController {

    async add({response,request,auth,params}){
        const answer = request.all()
        const question = await Question.find(params.id)
        const user = auth.user
        await question.answers().create({
            user_id: user.id,
            answer_text: answer.answer_text
        })
        return response.redirect('back')
    }

}

module.exports = AnswerController
