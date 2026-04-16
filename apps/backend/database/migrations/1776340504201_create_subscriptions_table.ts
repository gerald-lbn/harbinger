import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at').notNullable()
      table.integer('feed_id').references('id').inTable('feeds').notNullable().onDelete('cascade')
      table.integer('user_id').references('id').inTable('users').notNullable().onDelete('cascade')
      table.string('title').notNullable()

      table.unique(['feed_id', 'user_id'])
      table.index(['feed_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
