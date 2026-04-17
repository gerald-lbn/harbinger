import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { RecentlyReadEntryService } from '#services/recently_read_entry_service'
import { createRecentlyReadEntriesValidator } from '#validators/recently_read_entry'
import RecentlyReadEntryTransformer from '#transformers/recently_read_entry_transformer'

@inject()
export default class RecentlyReadEntriesController {
  constructor(private recentlyReadEntryService: RecentlyReadEntryService) {}

  /**
   * Display a list of resource
   */
  async index({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const entries = await this.recentlyReadEntryService.getRecentlyReadEntries(user)

    return serialize(RecentlyReadEntryTransformer.transform(entries))
  }

  /**
   * Handle form submission to mark entries as read
   */
  async store({ request, auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const payload = await request.validateUsing(createRecentlyReadEntriesValidator)

    const entries = await this.recentlyReadEntryService.markAsRead(
      user,
      payload.recently_read_entries
    )

    return serialize(RecentlyReadEntryTransformer.transform(entries))
  }
}
