'use strict'
var hdate = require('human-date')

const Question = use('App/Models/Question')
const User = use('App/Models/User')
const Vote = use('App/Models/Vote')
const Answer = use('App/Models/Answer')
class QuestionController {


    async store({auth,request,response}){

        const question = request.all()
        await auth.user.questions().create({
            question_text : question.question_text
        })
        return response.redirect('back')
    }
    
    async update({request,response,params}){

        const question = await Question.find(params.id)
        question.question_text = request.all().question_text
        await question.save()

        return response.redirect('/myQuestions')
    }
    async search({view,request}){

        const questions = await Question.query().where('question_text','like','%'+request.all().search_text+'%').fetch()
        return view.render('index',{questions: questions.toJSON()})

    }
    async edit({view,params}){
        const question = await Question.find(params.id)
        return view.render('/questions/edit',{question: question.toJSON()})
    }
    async delete({response,view,params}){
        const question = await Question.find(params.id)
        await question.delete()
        return response.redirect('back')
    }
    async answers({view,params,auth}){
        const question = await Question.find(params.id)
        const answers = await question.answers().fetch()
        const arr = []
        let this_user_id = false
        for(let a in answers.rows){
            const ans = await Answer.find(answers.rows[a].id)
            const user = await  User.find(ans.user_id)
            const v = await Vote.query().where('answer_id','=',ans.id).fetch()
            if(ans.user_id === auth.user.id) {
                this_user_id = true
            }
            let vote_count = 0
            let vote_users = null
            let isExitsUser = null
            if(v.rows.length !== 0){
                const vote = await Vote.find(v.rows[0].id)
                vote_count = vote.vote_count
                vote_users = vote.user_id.split(',')
                isExitsUser = vote_users.includes(''+ auth.user.id +'')
            }
            console.log(isExitsUser)
            console.log(vote_users)
            console.log(auth.user.id)
            arr.push({
                answer: ans,
                user: user,
                date: hdate.relativeTime(ans.created_at),
                vote_count : vote_count,
                vote_users: vote_users,
                isExitsUser: isExitsUser,
            })
        }
        return view.render('questions/answers',{this_user_id: this_user_id,answers: arr,question: question.toJSON()})
    }




}

module.exports = QuestionController
