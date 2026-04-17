import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { StarredEntryService } from '#services/starred_entry_service'
import {
  createStarredEntriesValidator,
  deleteStarredEntriesValidator,
} from '#validators/starred_entry'
import StarredEntryTransformer from '#transformers/starred_entry_transformer'

@inject()
export default class StarredEntriesController {
  constructor(private starredEntryService: StarredEntryService) {}

  /**
   * Display a list of recently read entry IDs
   */
  async index({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const entries = await this.starredEntryService.getStarredEntries(user)

    return serialize(StarredEntryTransformer.transform(entries))
  }

  /**
   * Handle form submission to mark entries as read
   */
  async store({ request, auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const payload = await request.validateUsing(createStarredEntriesValidator)

    const entries = await this.starredEntryService.star(user, payload.starred_entries)

    return serialize(StarredEntryTransformer.transform(entries))
  }

  /**
   * Delete record
   */
  async destroy({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const payload = await request.validateUsing(deleteStarredEntriesValidator)

    await this.starredEntryService.unstar(user, payload.starred_entries)

    return response.noContent()
  }
}