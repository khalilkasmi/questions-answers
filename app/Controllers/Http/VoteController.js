'use strict'
const Vote = use('App/Models/Vote')
class VoteController {

    async add({request,response,auth}){
        const vote = await Vote.query().where('answer_id','=',request.all().answer_id).fetch()
        if(vote.rows.length === 0){
          await Vote.create(request.only(['user_id','answer_id']))
          const created_vote = await Vote.query().where('answer_id','=',request.all().answer_id).fetch()  
          const new_vote = await Vote.find(created_vote.rows[0].id)
          if(new_vote.vote_count === null){
            new_vote.vote_count = 1
          } 
          new_vote.save()
        }else{
            const vote = await Vote.query().where('answer_id','=',request.all().answer_id).fetch()  
            const new_vote = await Vote.find(vote.rows[0].id)
            new_vote.vote_count++
            new_vote.user_id = new_vote.user_id+','+auth.user.id 
            new_vote.save()
        }
        return response.redirect('back')
    }


}

module.exports = VoteController
