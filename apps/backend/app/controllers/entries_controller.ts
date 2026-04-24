import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { EntryService } from '#services/entry_service'
import { feedEntriesPaginationValidator } from '#validators/entry'

@inject()
export default class EntriesController {
  constructor(private entryService: EntryService) {}

  /**
   * Display a list of resource
   */
  async index({ request, auth, params }: HttpContext) {
    const user = auth.getUserOrFail()

    const payload = await feedEntriesPaginationValidator.validate(request.qs())

    const entries = await this.entryService.getFeedEntries(user, params.feed_id, {
      page: payload.page,
      perPage: payload.per_page,
      since: payload?.since?.toJSDate(),
    })

    return entries
  }
}
