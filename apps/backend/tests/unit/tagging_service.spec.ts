import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { FeedFactory } from '#database/factories/feed_factory'
import { TaggingService } from '#services/tagging_service'
import { TagFactory } from '#database/factories/tag_factory'

test.group('Tagging service', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('createTagging creates a new tag and tagging when they do not exist', async ({ assert }) => {
    const service = new TaggingService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()
    const tagName = 'Tech'

    const { tagging, created } = await service.createTagging(user, feed.id, tagName)

    assert.isTrue(created)
    assert.equal(tagging.feedId, feed.id)
    assert.equal(tagging.userId, user.id)

    await tagging.load('tag')
    assert.equal(tagging.tag.name, tagName)
    assert.equal(tagging.tag.userId, user.id)
  })

  test('createTagging reuses an existing tag but creates a new tagging', async ({ assert }) => {
    const service = new TaggingService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()
    const tagName = 'Tech'

    const tag = await TagFactory.merge({ userId: user.id, name: tagName }).create()

    const { tagging, created } = await service.createTagging(user, feed.id, tagName)

    assert.isTrue(created)
    assert.equal(tagging.tagId, tag.id)
  })

  test('createTagging returns created: false when tagging already exists', async ({ assert }) => {
    const service = new TaggingService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()
    const tagName = 'Tech'

    await service.createTagging(user, feed.id, tagName)

    const { tagging, created } = await service.createTagging(user, feed.id, tagName)

    assert.isFalse(created)
    assert.exists(tagging.id)
  })
})