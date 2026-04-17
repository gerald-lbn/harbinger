import type User from '#models/user'
import RecentlyReadEntry from '#models/recently_read_entry'

export class RecentlyReadEntryService {
  async getRecentlyReadEntries(user: User): Promise<RecentlyReadEntry[]> {
    const entries = await user.related('recentlyReadEntries').query().orderBy('id', 'desc')

    return entries
  }

  async markAsRead(user: User, entryIds: number[]): Promise<RecentlyReadEntry[]> {
    const payloads = entryIds.map((id) => ({
      userId: user.id,
      entryId: id,
    }))

    const entries = await RecentlyReadEntry.updateOrCreateMany(['userId', 'entryId'], payloads)

    return entries
  }
}
