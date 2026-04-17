import { BaseTransformer } from '@adonisjs/core/transformers'
import type RecentlyReadEntry from '#models/recently_read_entry'

export default class RecentlyReadEntryTransformer extends BaseTransformer<RecentlyReadEntry> {
  toObject() {
    return this.pick(this.resource, ['entryId'])
  }
}
