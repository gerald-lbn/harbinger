import factory from '@adonisjs/lucid/factories'
import Tagging from '#models/tagging'
import { UserFactory } from '#database/factories/user_factory'
import { FeedFactory } from '#database/factories/feed_factory'
import { TagFactory } from '#database/factories/tag_factory'

export const TaggingFactory = factory
  .define(Tagging, async () => {
    return {}
  })
  .relation('user', () => UserFactory)
  .relation('feed', () => FeedFactory)
  .relation('tag', () => TagFactory)
  .build()