'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VoteSchema extends Schema {
  up () {
    this.create('votes', (table) => {
      table.increments()
      table.text('user_id')
      table.integer('answer_id').unique()
      table.integer('vote_count')
      table.timestamps()
    })
  }

  down () {
    this.drop('votes')
  }
}

module.exports = VoteSchema
