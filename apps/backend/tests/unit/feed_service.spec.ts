import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { FeedFactory } from '#database/factories/feed_factory'
import { FeedService } from '#services/feed_service'

test.group('Feed service', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('getFeedById returns a feed when it exists', async ({ assert }) => {
    const service = new FeedService()
    const feed = await FeedFactory.create()

    const result = await service.getFeedById(feed.id)

    assert.isNotNull(result)
    assert.equal(result?.id, feed.id)
    assert.equal(result?.title, feed.title)
  })

  test('getFeedById returns null when feed does not exist', async ({ assert }) => {
    const service = new FeedService()
    const result = await service.getFeedById(9999)

    assert.isNull(result)
  })
})
