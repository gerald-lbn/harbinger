import { TaggingSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Feed from '#models/feed'
import Tag from '#models/tag'

export default class Tagging extends TaggingSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Feed)
  declare feed: BelongsTo<typeof Feed>

  @belongsTo(() => Tag)
  declare tag: BelongsTo<typeof Tag>
}
