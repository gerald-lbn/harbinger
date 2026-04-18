import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { TagFactory } from '#database/factories/tag_factory'
import { TagService } from '#services/tag_service'

test.group('Tag service', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns an empty array when the user has no tags', async ({ assert }) => {
    const service = new TagService()
    const user = await UserFactory.create()

    const tags = await service.getUserTags(user)

    assert.isEmpty(tags)
  })

  test('returns tags ordered by name ascending', async ({ assert }) => {
    const service = new TagService()
    const user = await UserFactory.create()

    await TagFactory.merge({ userId: user.id, name: 'Zebra' }).create()
    await TagFactory.merge({ userId: user.id, name: 'Apple' }).create()
    await TagFactory.merge({ userId: user.id, name: 'Mango' }).create()

    const tags = await service.getUserTags(user)

    assert.lengthOf(tags, 3)
    assert.equal(tags[0].name, 'Apple')
    assert.equal(tags[1].name, 'Mango')
    assert.equal(tags[2].name, 'Zebra')
  })

  test('only returns tags belonging to the user', async ({ assert }) => {
    const service = new TagService()
    const user1 = await UserFactory.create()
    const user2 = await UserFactory.create()

    await TagFactory.merge({ userId: user1.id, name: 'User 1 Tag' }).create()
    await TagFactory.merge({ userId: user2.id, name: 'User 2 Tag' }).create()

    const tags = await service.getUserTags(user1)

    assert.lengthOf(tags, 1)
    assert.equal(tags[0].name, 'User 1 Tag')
  })

  test('successfully renames a tag', async ({ assert }) => {
    const service = new TagService()
    const user = await UserFactory.create()
    const tag = await TagFactory.merge({ userId: user.id, name: 'Old Name' }).create()

    const updated = await service.renameTag(user, tag.id, 'New Name')

    assert.isNotNull(updated)
    assert.equal(updated?.name, 'New Name')

    await tag.refresh()
    assert.equal(tag.name, 'New Name')
  })

  test('returns null when trying to rename a tag that does not exist', async ({ assert }) => {
    const service = new TagService()
    const user = await UserFactory.create()

    const updated = await service.renameTag(user, 999, 'New Name')

    assert.isNull(updated)
  })

  test('returns null when trying to rename a tag belonging to another user', async ({ assert }) => {
    const service = new TagService()
    const user1 = await UserFactory.create()
    const user2 = await UserFactory.create()
    const tag = await TagFactory.merge({ userId: user2.id, name: 'Other User Tag' }).create()

    const updated = await service.renameTag(user1, tag.id, 'New Name')

    assert.isNull(updated)
  })

  test('throws unique constraint error when renaming to an existing tag name', async ({
    assert,
  }) => {
    const service = new TagService()
    const user = await UserFactory.create()
    await TagFactory.merge({ userId: user.id, name: 'Existing Tag' }).create()
    const tag = await TagFactory.merge({ userId: user.id, name: 'My Tag' }).create()

    await assert.rejects(
      () => service.renameTag(user, tag.id, 'Existing Tag'),
      /UNIQUE constraint failed/
    )
  })
})
