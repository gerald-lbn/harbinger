import { FeedSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Subscription from '#models/subscription'
import Entry from '#models/entry'
import Tagging from '#models/tagging'

export default class Feed extends FeedSchema {
  @hasMany(() => Subscription)
  declare subscriptions: HasMany<typeof Subscription>

  @hasMany(() => Entry)
  declare entries: HasMany<typeof Entry>

  @hasMany(() => Tagging)
  declare taggings: HasMany<typeof Tagging>
}
