import type User from '#models/user'
import Entry from '#models/entry'
import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'


export interface GetFeedEntriesOptions {
  page?: number
  since?: Date
  read?: boolean
  starred?: boolean
  perPage?: number
}

const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 100

@inject()
export class EntryService {
  async getFeedEntries(
    user: User,
    feedId: number,
    options?: GetFeedEntriesOptions
  ): Promise<Entry[]> {
    const subscription = await user
      .related('subscriptions')
      .query()
      .where('feedId', feedId)
      .first()

    if (!subscription) {
      return []
    }

    const query = Entry.query().where('feedId', feedId).orderBy('created_at', 'desc')

    if (options?.since) {
      query.where('created_at', '>', DateTime.fromJSDate(options.since).toSQL() as string)
    }

    const page = options?.page || DEFAULT_PAGE
    const perPage = options?.perPage || DEFAULT_PER_PAGE

    const paginatedEntries = await query.paginate(page, perPage)
    return paginatedEntries.all()
  }
}
