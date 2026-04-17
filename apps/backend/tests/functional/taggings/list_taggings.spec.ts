import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { FeedFactory } from '#database/factories/feed_factory'
import { TaggingFactory } from '#database/factories/tagging_factory'

test.group('List taggings', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns 200 with an empty array if there are no records', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/api/v1/taggings').loginAs(user)

    response.assertStatus(200)
    response.assertBody({ data: [] })
  })

  test('returns 200 with array of taggings', async ({ client }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()
    
    await TaggingFactory.merge({ userId: user.id, feedId: feed.id })
      .with('tag', 1, (t) => t.merge({ userId: user.id, name: 'Tech' }))
      .create()

    const response = await client.get('/api/v1/taggings').loginAs(user)

    response.assertStatus(200)
    response.assertBody({
      data: [
        {
          id: 1,
          feedId: feed.id,
          name: 'Tech',
        },
      ],
    })
  })

  test('returns 200 for a specific tagging', async ({ client }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()
    const tagging = await TaggingFactory.merge({ userId: user.id, feedId: feed.id })
      .with('tag', 1, (t) => t.merge({ userId: user.id, name: 'News' }))
      .create()

    const response = await client.get(`/api/v1/taggings/${tagging.id}`).loginAs(user)

    response.assertStatus(200)
    response.assertBody({
      data: {
        id: tagging.id,
        feedId: feed.id,
        name: 'News',
      },
    })
  })

  test('returns 404 when trying to access another user tagging', async ({ client }) => {
    const user = await UserFactory.create()
    const otherUser = await UserFactory.create()
    const feed = await FeedFactory.create()
    const tagging = await TaggingFactory.merge({ userId: otherUser.id, feedId: feed.id })
      .with('tag', 1, (t) => t.merge({ userId: otherUser.id, name: 'Hidden' }))
      .create()

    const response = await client.get(`/api/v1/taggings/${tagging.id}`).loginAs(user)

    response.assertStatus(404)
  })

  test('returns 404 when tagging does not exist', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/api/v1/taggings/999').loginAs(user)

    response.assertStatus(404)
  })
})