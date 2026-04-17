import { StarredEntrySchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Entry from '#models/entry'

export default class StarredEntry extends StarredEntrySchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Entry)
  declare entry: BelongsTo<typeof Entry>
}