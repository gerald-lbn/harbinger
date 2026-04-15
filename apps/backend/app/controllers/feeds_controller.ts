import Feed from '#models/feed'
import FeedTransformer from '#transformers/feed_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class FeedsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params, response, serialize }: HttpContext) {
    const feed = await Feed.query().where('id', params.id).first()
    if (!feed) return response.notFound()

    return serialize(FeedTransformer.transform(feed))
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
