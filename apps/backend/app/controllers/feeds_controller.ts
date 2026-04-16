import { FeedService } from '#services/feed_service'
import FeedTransformer from '#transformers/feed_transformer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class FeedsController {
  constructor(private feed_service: FeedService) {}

  /**
   * Show individual record
   */
  async show({ params, response, serialize }: HttpContext) {
    const feed = await this.feed_service.getFeedById(params.id)
    if (!feed) return response.notFound()

    return serialize(FeedTransformer.transform(feed))
  }
}
