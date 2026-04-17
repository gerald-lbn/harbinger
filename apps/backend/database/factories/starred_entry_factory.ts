import factory from '@adonisjs/lucid/factories'
import StarredEntry from '#models/starred_entry'
import { UserFactory } from '#database/factories/user_factory'
import { EntryFactory } from '#database/factories/entry_factory'

export const StarredEntryFactory = factory
  .define(StarredEntry, async () => {
    return {}
  })
  .relation('user', () => UserFactory)
  .relation('entry', () => EntryFactory)
  .build()