import type User from '#models/user'
import Tagging from '#models/tagging'

export class TaggingService {
  async getUserTaggings(user: User): Promise<Tagging[]> {
    return await user.related('taggings').query().preload('tag').orderBy('id', 'asc')
  }

  async createTagging(
    user: User,
    feedId: number,
    name: string
  ): Promise<{ tagging: Tagging; created: boolean }> {
    const tag = await user.related('tags').firstOrCreate({ name }, { name })

    const existingTagging = await user
      .related('taggings')
      .query()
      .where('feed_id', feedId)
      .where('tag_id', tag.id)
      .first()

    if (existingTagging) {
      await existingTagging.load('tag')
      return { tagging: existingTagging, created: false }
    }
    const tagging = await user.related('taggings').create({
      feedId,
      tagId: tag.id,
    })

    await tagging.load('tag')
    return { tagging, created: true }
  }
}
