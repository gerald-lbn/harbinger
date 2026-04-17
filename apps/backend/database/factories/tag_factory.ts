import factory from '@adonisjs/lucid/factories'
import Tag from '#models/tag'
import { UserFactory } from '#database/factories/user_factory'

export const TagFactory = factory
  .define(Tag, async ({ faker }) => {
    return {
      name: faker.lorem.word(),
    }
  })
  .relation('user', () => UserFactory)
  .build()