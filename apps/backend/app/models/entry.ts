import { EntrySchema } from '#database/schema'
import Feed from '#models/feed'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Entry extends EntrySchema {
  @belongsTo(() => Feed)
  declare feed: BelongsTo<typeof Feed>
}
