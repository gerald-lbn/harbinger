import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'entries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('feed_id').references('id').inTable('feeds').notNullable().onDelete('cascade')
      table.string('title').notNullable()
      table.string('url').notNullable()
      table.string('author')
      table.string('content')
      table.timestamp('created_at').notNullable()

      table.unique(['feed_id', 'url'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
