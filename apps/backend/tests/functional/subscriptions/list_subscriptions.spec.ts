import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'

test.group('List subscriptions', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns 200 with an empty list when user has no subscriptions', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/api/v1/subscriptions').loginAs(user)

    response.assertStatus(200)
    response.assertBody({ data: [] })
  })

  test('returns 200 with a list of subscriptions for the user', async ({ client }) => {
    const user = await UserFactory.with('subscriptions', 3, (subscription) =>
      subscription.with('feed')
    ).create()

    const response = await client.get('/api/v1/subscriptions').loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({
      data: [{ id: 1 }, { id: 2 }, { id: 3 }],
    })
  })

  test('returns 401 when user is not authenticated', async ({ client }) => {
    const response = await client.get('/api/v1/subscriptions')
    response.assertStatus(401)
  })
})
