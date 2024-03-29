'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Question extends Model {

    answers(){
        return this.hasMany('App/Models/Answer')
    }
    user(){
        return this.belongsTo('App/Models/User')
    }

}

module.exports = Question
