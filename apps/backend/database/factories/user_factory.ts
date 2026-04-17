import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { SubscriptionFactory } from '#database/factories/subscription_factory'
import { RecentlyReadEntryFactory } from '#database/factories/recently_read_entry_factory'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.internet.displayName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .relation('subscriptions', () => SubscriptionFactory)
  .relation('recentlyReadEntries', () => RecentlyReadEntryFactory)
  .build()
