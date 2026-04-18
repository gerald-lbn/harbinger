import { BaseTransformer } from '@adonisjs/core/transformers'
import type Tag from '#models/tag'

export default class TagTransformer extends BaseTransformer<Tag> {
  toObject() {
    return this.pick(this.resource, ['id', 'name'])
  }
}
