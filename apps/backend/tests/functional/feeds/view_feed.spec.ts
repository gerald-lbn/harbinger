import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { FeedFactory } from '#database/factories/feed_factory'
import { UserFactory } from '#database/factories/user_factory'

test.group('View feed', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns 200 for an existing feed', async ({ client }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()
    const response = await client.get(`/api/v1/feeds/${feed.id}`).loginAs(user)
    response.assertStatus(200)
  })

  test('returns 404 for a non-existent feed', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/api/v1/feeds/99999').loginAs(user)
    response.assertStatus(404)
  })
})
