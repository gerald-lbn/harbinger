import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { TagFactory } from '#database/factories/tag_factory'

test.group('Update tag', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('successfully renames a tag', async ({ client }) => {
    const user = await UserFactory.create()
    const tag = await TagFactory.merge({ userId: user.id, name: 'Old Name' }).create()

    const response = await client.patch(`/api/v1/tags/${tag.id}`)
      .loginAs(user)
      .json({ name: 'New Name' })

    response.assertStatus(200)
    response.assertBody({
      data: {
        id: tag.id,
        name: 'New Name',
      },
    })
  })

  test('returns 404 when tag does not exist', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.patch('/api/v1/tags/999')
      .loginAs(user)
      .json({ name: 'New Name' })

    response.assertStatus(404)
  })

  test('returns 404 when tag belongs to another user', async ({ client }) => {
    const user1 = await UserFactory.create()
    const user2 = await UserFactory.create()
    const tag = await TagFactory.merge({ userId: user2.id }).create()

    const response = await client.patch(`/api/v1/tags/${tag.id}`)
      .loginAs(user1)
      .json({ name: 'Stolen Name' })

    response.assertStatus(404)
  })

  test('returns 422 when name is missing or empty', async ({ client }) => {
    const user = await UserFactory.create()
    const tag = await TagFactory.merge({ userId: user.id }).create()

    const response = await client.patch(`/api/v1/tags/${tag.id}`)
      .loginAs(user)
      .json({ name: '' })

    response.assertStatus(422)
  })

  test('returns 401 when not authenticated', async ({ client }) => {
    const response = await client.patch('/api/v1/tags/1')
      .json({ name: 'New Name' })

    response.assertStatus(401)
  })
})
