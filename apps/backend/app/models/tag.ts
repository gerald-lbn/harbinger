import { TagSchema } from '#database/schema'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Tagging from '#models/tagging'

export default class Tag extends TagSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Tagging)
  declare taggings: HasMany<typeof Tagging>
}
