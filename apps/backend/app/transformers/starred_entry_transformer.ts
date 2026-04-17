import { BaseTransformer } from '@adonisjs/core/transformers'
import type StarredEntry from '#models/starred_entry'

export default class StarredEntryTransformer extends BaseTransformer<StarredEntry> {
  toObject() {
    return this.pick(this.resource, ['entryId'])
  }
}
