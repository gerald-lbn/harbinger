import type User from '#models/user'
import StarredEntry from '#models/starred_entry'

export class StarredEntryService {
  async getStarredEntries(user: User): Promise<StarredEntry[]> {
    const entries = await user.related('starredEntries').query().orderBy('id', 'desc')

    return entries
  }

  async star(user: User, entryIds: number[]): Promise<StarredEntry[]> {
    const payloads = entryIds.map((id) => ({
      userId: user.id,
      entryId: id,
    }))

    const entries = await StarredEntry.updateOrCreateMany(['userId', 'entryId'], payloads)

    return entries
  }

  async unstar(user: User, entryIds: number[]): Promise<void> {
    await user
      .related('starredEntries')
      .query()
      .whereIn('entry_id', entryIds)
      .delete()
  }
}
