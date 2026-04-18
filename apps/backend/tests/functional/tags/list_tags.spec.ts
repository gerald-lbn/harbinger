import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { TagFactory } from '#database/factories/tag_factory'

test.group('List tags', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns 200 with an empty array if there are no tags', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/api/v1/tags').loginAs(user)

    response.assertStatus(200)
    response.assertBody({ data: [] })
  })

  test('returns 200 with tags in alphabetical order', async ({ client }) => {
    const user = await UserFactory.create()
    
    await TagFactory.merge({ userId: user.id, name: 'Zebra' }).create()
    await TagFactory.merge({ userId: user.id, name: 'Apple' }).create()
    await TagFactory.merge({ userId: user.id, name: 'Mango' }).create()

    const response = await client.get('/api/v1/tags').loginAs(user)

    response.assertStatus(200)
    response.assertBody({
      data: [
        { id: 2, name: 'Apple' },
        { id: 3, name: 'Mango' },
        { id: 1, name: 'Zebra' },
      ],
    })
  })

  test('only returns tags belonging to the user', async ({ client }) => {
    const user1 = await UserFactory.create()
    const user2 = await UserFactory.create()

    await TagFactory.merge({ userId: user1.id, name: 'User 1 Tag' }).create()
    await TagFactory.merge({ userId: user2.id, name: 'User 2 Tag' }).create()

    const response = await client.get('/api/v1/tags').loginAs(user1)

    response.assertStatus(200)
    response.assertBody({
      data: [
        { id: 1, name: 'User 1 Tag' },
      ],
    })
  })

  test('returns 401 when not authenticated', async ({ client }) => {
    const response = await client.get('/api/v1/tags')
    response.assertStatus(401)
  })
})
