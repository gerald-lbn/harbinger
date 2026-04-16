import factory from '@adonisjs/lucid/factories'
import Subscription from '#models/subscription'
import { FeedFactory } from '#database/factories/feed_factory'
import { UserFactory } from '#database/factories/user_factory'

export const SubscriptionFactory = factory
  .define(Subscription, async ({ faker }) => {
    return {
      title: faker.company.buzzNoun(),
    }
  })
  .relation('feed', () => FeedFactory)
  .relation('user', () => UserFactory)
  .build()
