import factory from '@adonisjs/lucid/factories'
import Feed from '#models/feed'

export const FeedFactory = factory
  .define(Feed, async ({ faker }) => {
    const url = faker.internet.url({ appendSlash: false })
    return {
      title: faker.company.name(),
      site: url,
      url: `${url}/feed.xml`,
    }
  })
  .build()
