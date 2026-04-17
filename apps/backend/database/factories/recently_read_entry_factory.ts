import factory from '@adonisjs/lucid/factories'
import RecentlyReadEntry from '#models/recently_read_entry'

import { UserFactory } from '#database/factories/user_factory'
import { EntryFactory } from '#database/factories/entry_factory'

export const RecentlyReadEntryFactory = factory
  .define(RecentlyReadEntry, async ({ faker }) => {
    return {}
  })
  .relation('user', () => UserFactory)
  .relation('entry', () => EntryFactory)
  .build()