import { BaseTransformer } from '@adonisjs/core/transformers'
import type Feed from '#models/feed'

export default class FeedTransformer extends BaseTransformer<Feed> {
  toObject() {
    return this.pick(this.resource, ['id', 'title', 'url', 'site'])
  }
}
