import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { FeedFactory } from '#database/factories/feed_factory'
import { TaggingFactory } from '#database/factories/tagging_factory'

test.group('Manage taggings', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('POST /api/v1/taggings returns 201 Created and Location header', async ({ client }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    const response = await client
      .post('/api/v1/taggings')
      .json({ feed_id: feed.id, name: 'Tech' })
      .loginAs(user)

    response.assertStatus(201)
    response.assertHeader('Location', '/api/v1/taggings/1')
    response.assertBody({
      data: {
        // @ts-ignore Transformer has the id key
        id: 1,
        feedId: feed.id,
        name: 'Tech',
      },
    })
  })

  test('POST /api/v1/taggings returns 302 Found if already exists', async ({ client }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    await client.post('/api/v1/taggings').json({ feed_id: feed.id, name: 'Tech' }).loginAs(user)
    const response = await client
      .post('/api/v1/taggings')
      .json({ feed_id: feed.id, name: 'Tech' })
      .redirects(0)
      .loginAs(user)

    response.assertStatus(302)
    response.assertHeader('Location', '/api/v1/taggings/1')
  })

  test('DELETE /api/v1/taggings/:id returns 204 No Content', async ({ client }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()
    const tagging = await TaggingFactory.merge({ userId: user.id, feedId: feed.id })
      .with('tag', 1, (t) => t.merge({ userId: user.id, name: 'Tech' }))
      .create()

    const response = await client.delete(`/api/v1/taggings/${tagging.id}`).loginAs(user)

    response.assertStatus(204)
  })

  test('DELETE /api/v1/taggings/:id returns 404 when deleting another user tagging', async ({
    client,
  }) => {
    const user = await UserFactory.create()
    const otherUser = await UserFactory.create()
    const feed = await FeedFactory.create()
    const tagging = await TaggingFactory.merge({ userId: otherUser.id, feedId: feed.id })
      .with('tag', 1, (t) => t.merge({ userId: otherUser.id, name: 'Hidden' }))
      .create()

    const response = await client.delete(`/api/v1/taggings/${tagging.id}`).loginAs(user)

    response.assertStatus(404)
  })
})
