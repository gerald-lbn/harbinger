import type User from '#models/user'
import type Tag from '#models/tag'

export class TagService {
  async getUserTags(user: User): Promise<Tag[]> {
    return await user.related('tags').query().orderBy('name', 'asc')
  }

  async renameTag(user: User, id: number, newName: string): Promise<Tag | null> {
    const tag = await user.related('tags').query().where('id', id).first()

    if (!tag) {
      return null
    }

    if (tag.name === newName) {
      return tag
    }

    return tag.merge({ name: newName }).save()
  }

  async deleteTag(user: User, id: number): Promise<boolean> {
    const tag = await user.related('tags').query().where('id', id).first()

    if (!tag) {
      return false
    }

    await tag.delete()
    return true
  }
}
