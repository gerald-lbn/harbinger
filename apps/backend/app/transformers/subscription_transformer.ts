import { BaseTransformer } from '@adonisjs/core/transformers'
import type Subscription from '#models/subscription'
import FeedTransformer from '#transformers/feed_transformer'

export default class SubscriptionTransformer extends BaseTransformer<Subscription> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'createdAt', 'feedId']),
      feed: FeedTransformer.transform(this.whenLoaded(this.resource.feed)),
    }
  }
}
