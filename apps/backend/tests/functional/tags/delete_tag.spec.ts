import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { TagFactory } from '#database/factories/tag_factory'

test.group('Delete tag', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('successfully deletes a tag', async ({ assert, client }) => {
    const user = await UserFactory.create()
    const tag = await TagFactory.merge({ userId: user.id }).create()

    const response = await client.delete(`/api/v1/tags/${tag.id}`).loginAs(user)

    response.assertStatus(204)

    const stillExists = await user.related('tags').query().where('id', tag.id).first()
    assert.isNull(stillExists)
  })

  test('returns 404 when tag does not exist', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.delete('/api/v1/tags/999').loginAs(user)

    response.assertStatus(404)
  })

  test('returns 404 when tag belongs to another user', async ({ assert, client }) => {
    const user1 = await UserFactory.create()
    const user2 = await UserFactory.create()
    const tag = await TagFactory.merge({ userId: user2.id }).create()

    const response = await client.delete(`/api/v1/tags/${tag.id}`).loginAs(user1)

    response.assertStatus(404)

    const stillExists = await user2.related('tags').query().where('id', tag.id).first()
    assert.isNotNull(stillExists)
  })

  test('returns 401 when not authenticated', async ({ client }) => {
    const response = await client.delete('/api/v1/tags/1')
    response.assertStatus(401)
  })
})
