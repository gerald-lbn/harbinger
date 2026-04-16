import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { EntryService } from '#services/entry_service'
import { feedEntriesPaginationValidator } from '#validators/entry'

@inject()
export default class EntriesController {
  constructor(private entryService: EntryService) { }

  /**
   * Display a list of resource
   */
  async index({ request, auth, params }: HttpContext) {
    const user = auth.getUserOrFail()

    const payload = await feedEntriesPaginationValidator.validate({
      ...params,
      ...request.qs(),
    })

    const entries = await this.entryService.getFeedEntries(user, payload.feed_id, {
      page: payload.page,
      perPage: payload.per_page,
      since: payload?.since?.toJSDate(),
    })

    return entries
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) { }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}