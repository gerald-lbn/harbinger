import { EntrySchema } from '#database/schema'
import Feed from '#models/feed'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'

export default class Entry extends EntrySchema {
  @belongsTo(() => Feed)
  declare feed: BelongsTo<typeof Feed>
}
