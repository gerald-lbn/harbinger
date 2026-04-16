import Feed from '#models/feed'
import FeedTransformer from '#transformers/feed_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class FeedsController {
  /**
   * Show individual record
   */
  async show({ params, response, serialize }: HttpContext) {
    const feed = await Feed.query().where('id', params.id).first()
    if (!feed) return response.notFound()

    return serialize(FeedTransformer.transform(feed))
  }
}
