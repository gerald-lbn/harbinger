import type User from '#models/user'
import type Tag from '#models/tag'

export class TagService {
  async getUserTags(user: User): Promise<Tag[]> {
    return await user.related('tags').query().orderBy('name', 'asc')
  }
}
