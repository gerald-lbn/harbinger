import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { FeedFactory } from '#database/factories/feed_factory'
import { TaggingService } from '#services/tagging_service'
import { TagFactory } from '#database/factories/tag_factory'
import { TaggingFactory } from '#database/factories/tagging_factory'

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

  test('getUserTaggings returns all taggings for a user', async ({ assert }) => {
    const service = new TaggingService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    await TaggingFactory.merge({ userId: user.id, feedId: feed.id })
      .with('tag', 1, (t) => t.merge({ userId: user.id, name: 'News' }))
      .create()

    const taggings = await service.getUserTaggings(user)

    assert.lengthOf(taggings, 1)
    assert.equal(taggings[0].tag.name, 'News')
  })

  test('getTaggingById returns a tagging when it exists', async ({ assert }) => {
    const service = new TaggingService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    const taggingOriginal = await TaggingFactory.merge({ userId: user.id, feedId: feed.id })
      .with('tag', 1, (t) => t.merge({ userId: user.id, name: 'Tech' }))
      .create()

    const tagging = await service.getTaggingById(taggingOriginal.id)

    assert.exists(tagging)
    assert.equal(tagging?.id, taggingOriginal.id)
    assert.equal(tagging?.tag.name, 'Tech')
  })

  test('getTaggingById returns null when it does not exist', async ({ assert }) => {
    const service = new TaggingService()
    const tagging = await service.getTaggingById(999)

    assert.isNull(tagging)
  })

  test('deleteTagging deletes a tagging for a user', async ({ assert }) => {
    const service = new TaggingService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    const tagging = await TaggingFactory.merge({ userId: user.id, feedId: feed.id })
      .with('tag', 1, (t) => t.merge({ userId: user.id, name: 'Tech' }))
      .create()

    const deleted = await service.deleteTagging(user, tagging.id)

    assert.isTrue(deleted)
    const exists = await service.getTaggingById(tagging.id)
    assert.isNull(exists)
  })

  test('deleteTagging returns false when it does not exist', async ({ assert }) => {
    const service = new TaggingService()
    const user = await UserFactory.create()

    const deleted = await service.deleteTagging(user, 999)

    assert.isFalse(deleted)
  })

  test('deleteTagging returns false when not owned by the user', async ({ assert }) => {
    const service = new TaggingService()
    const user = await UserFactory.create()
    const otherUser = await UserFactory.create()
    const feed = await FeedFactory.create()

    const tagging = await TaggingFactory.merge({ userId: otherUser.id, feedId: feed.id })
      .with('tag', 1, (t) => t.merge({ userId: otherUser.id, name: 'Tech' }))
      .create()

    const deleted = await service.deleteTagging(user, tagging.id)

    assert.isFalse(deleted)
  })
})