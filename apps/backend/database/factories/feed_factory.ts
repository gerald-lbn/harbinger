import factory from '@adonisjs/lucid/factories'
import Feed from '#models/feed'
import { EntryFactory } from '#database/factories/entry_factory'

export const FeedFactory = factory
  .define(Feed, async ({ faker }) => {
    const url = faker.internet.url({ appendSlash: false })
    return {
      title: faker.company.name(),
      site: url,
      url: `${url}/feed.xml`,
    }
  })
  .relation('entries', () => EntryFactory)
  .build()
