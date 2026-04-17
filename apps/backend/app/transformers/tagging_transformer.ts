import { BaseTransformer } from '@adonisjs/core/transformers'
import type Tagging from '#models/tagging'

export default class TaggingTransformer extends BaseTransformer<Tagging> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'feedId']),
      ...this.pick(this.resource.tag, ['name']),
    }
  }
}
