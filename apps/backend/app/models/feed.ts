import { FeedSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Subscription from '#models/subscription'

export default class Feed extends FeedSchema {
  @hasMany(() => Subscription)
  declare subscriptions: HasMany<typeof Subscription>
}
