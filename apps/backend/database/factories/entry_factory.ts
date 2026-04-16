import factory from '@adonisjs/lucid/factories'
import Entry from '#models/entry'
import { FeedFactory } from '#database/factories/feed_factory'

export const EntryFactory = factory
  .define(Entry, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      url: faker.internet.url({ appendSlash: false }),
      author: faker.person.fullName(),
      content: faker.lorem.paragraph(),
    }
  })
  .relation('feed', () => FeedFactory)
  .build()
