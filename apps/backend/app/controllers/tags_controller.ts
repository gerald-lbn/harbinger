import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { TagService } from '#services/tag_service'
import TagTransformer from '#transformers/tag_transformer'

@inject()
export default class TagsController {
  constructor(private tagService: TagService) {}

  /**
   * Display a list of resource
   */
  async index({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const tags = await this.tagService.getUserTags(user)

    return serialize(TagTransformer.transform(tags))
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}