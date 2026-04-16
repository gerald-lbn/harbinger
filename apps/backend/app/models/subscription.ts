import { SubscriptionSchema } from '#database/schema'
import Feed from '#models/feed'
import User from '#models/user'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Subscription extends SubscriptionSchema {
  @belongsTo(() => Feed)
  declare feed: BelongsTo<typeof Feed>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
