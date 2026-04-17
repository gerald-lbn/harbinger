import { RecentlyReadEntrySchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/users'
import Entry from '#models/entry'

export default class RecentlyReadEntry extends RecentlyReadEntrySchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Entry)
  declare entry: BelongsTo<typeof Entry>
}
