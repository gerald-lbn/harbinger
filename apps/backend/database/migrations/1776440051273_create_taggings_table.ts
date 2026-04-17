import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'taggings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('feed_id')
        .unsigned()
        .references('id')
        .inTable('feeds')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('tag_id')
        .unsigned()
        .references('id')
        .inTable('tags')
        .onDelete('CASCADE')
        .notNullable()

      table.unique(['user_id', 'feed_id', 'tag_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
