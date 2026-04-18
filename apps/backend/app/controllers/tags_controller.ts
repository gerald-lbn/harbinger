import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { TagService } from '#services/tag_service'
import TagTransformer from '#transformers/tag_transformer'
import { tagIdValidator, updateTagValidator } from '#validators/tag'

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
   * Handle form submission for the edit action
   */
  async update({ auth, params, request, response, serialize }: HttpContext) {
    const { id } = await tagIdValidator.validate(params)
    const { name } = await request.validateUsing(updateTagValidator)
    const user = auth.getUserOrFail()

    const tag = await this.tagService.renameTag(user, id, name)

    if (!tag) {
      return response.notFound()
    }

    return serialize(TagTransformer.transform(tag))
  }

  /**
   * Delete record
   */
  async destroy({ auth, params, response }: HttpContext) {
    const { id } = await tagIdValidator.validate(params)
    const user = auth.getUserOrFail()

    const success = await this.tagService.deleteTag(user, id)

    if (!success) {
      return response.notFound()
    }

    return response.noContent()
  }
}