import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recently_read_entries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('entry_id').unsigned().references('entries.id').onDelete('CASCADE')

      table.unique(['user_id', 'entry_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
