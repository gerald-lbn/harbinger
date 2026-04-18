import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { TaggingService } from '#services/tagging_service'
import TaggingTransformer from '#transformers/tagging_transformer'
import { createTaggingValidator } from '#validators/tagging'

@inject()
export default class TaggingsController {
  constructor(private taggingService: TaggingService) { }

  /**
   * Display a list of resource
   */
  async index({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const taggings = await this.taggingService.getUserTaggings(user)

    return serialize(TaggingTransformer.transform(taggings))
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { feed_id: feedId, name } = await request.validateUsing(createTaggingValidator)

    const { tagging, created } = await this.taggingService.createTagging(user, feedId, name)
    const transformed = await serialize(TaggingTransformer.transform(tagging))

    response.header('Location', `/api/v1/taggings/${tagging.id}`)
    return response.status(created ? 201 : 302).send(transformed)
  }

  /**
   * Show individual record
   */
  async show({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const tagging = await this.taggingService.getTaggingById(user, params.id)

    if (!tagging) {
      return response.notFound()
    }

    return serialize(TaggingTransformer.transform(tagging))
  }

  /**
   * Delete record
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const tagging = await this.taggingService.getTaggingById(user, params.id)

    if (!tagging) {
      return response.notFound()
    }

    await this.taggingService.deleteTagging(user, params.id)
    return response.noContent()
  }
}
