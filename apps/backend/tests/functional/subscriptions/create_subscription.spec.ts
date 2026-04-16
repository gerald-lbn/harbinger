import { test } from '@japa/runner'
import app from '@adonisjs/core/services/app'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { FeedDiscoveryService, type FeedOption } from '#services/feed_discovery_service'

test.group('Create subscription', (group) => {
  group.each.setup(async () => {
    await testUtils.db().truncate()
  })

  test('returns 201 when subscribing to a new feed', async ({ client }) => {
    const user = await UserFactory.create()
    const feedUrl = 'https://example.com/feed.xml'

    class MockDiscovery extends FeedDiscoveryService {
      override async discover(_url: string): Promise<FeedOption[]> {
        return [{ feed_url: feedUrl, title: 'Example Feed' }]
      }
    }

    app.container.swap(FeedDiscoveryService, () => new MockDiscovery())

    const response = await client.post('/api/v1/subscriptions').loginAs(user).json({
      feed_url: feedUrl,
    })

    response.assertStatus(201)
    response.assertBodyContains({ data: { title: 'Example Feed' } })
  })

  test('returns 200 when subscription already exists', async ({ client }) => {
    const user = await UserFactory.create()
    const feedUrl = 'https://existing.com/feed'

    class MockDiscovery extends FeedDiscoveryService {
      override async discover(_url: string): Promise<FeedOption[]> {
        return [{ feed_url: feedUrl, title: 'Existing' }]
      }
    }

    app.container.swap(FeedDiscoveryService, () => new MockDiscovery())

    await client.post('/api/v1/subscriptions').loginAs(user).json({ feed_url: feedUrl })

    const response = await client.post('/api/v1/subscriptions')
      .loginAs(user).json({
        feed_url: feedUrl,
      })

    response.assertStatus(200)
    response.assertBodyContains({ data: { title: 'Existing' } })
  })

  test('returns 300 when multiple feeds are discovered', async ({ assert, client }) => {
    const user = await UserFactory.create()
    const options: FeedOption[] = [
      { feed_url: 'https://site.com/rss', title: 'RSS' },
      { feed_url: 'https://site.com/atom', title: 'Atom' },
    ]

    class MockDiscovery extends FeedDiscoveryService {
      override async discover(_url: string): Promise<FeedOption[]> {
        return options
      }
    }

    app.container.swap(FeedDiscoveryService, () => new MockDiscovery())

    const response = await client.post('/api/v1/subscriptions').loginAs(user).json({
      feed_url: 'https://site.com',
    })

    response.assertStatus(300)
    assert.equal(JSON.stringify(response.body()), JSON.stringify({ data: options }))
  })

  test('returns 404 when no feeds are found at the URL', async ({ client }) => {
    const user = await UserFactory.create()

    class MockDiscovery extends FeedDiscoveryService {
      override async discover(_url: string): Promise<FeedOption[]> {
        return []
      }
    }

    app.container.swap(FeedDiscoveryService, () => new MockDiscovery())

    const response = await client.post('/api/v1/subscriptions').loginAs(user).json({
      feed_url: 'https://empty.com',
    })

    response.assertStatus(404)
    response.assertBodyContains({ message: 'No feed found at the provided URL' })
  })

  test('returns 401 when user is not authenticated', async ({ client }) => {
    const response = await client.post('/api/v1/subscriptions').json({
      feed_url: 'https://example.com/feed.xml',
    })
    response.assertStatus(401)
  })

  test('forbids creating duplicate subscriptions for the same feed', async ({ assert, client }) => {
    const user = await UserFactory.create()
    const feedUrl = 'https://duplicate.com/feed'

    class MockDiscovery extends FeedDiscoveryService {
      override async discover(_url: string): Promise<FeedOption[]> {
        return [{ feed_url: feedUrl, title: 'Duplicate' }]
      }
    }

    app.container.swap(FeedDiscoveryService, () => new MockDiscovery())

    await client.post('/api/v1/subscriptions').loginAs(user).json({ feed_url: feedUrl })
    const response = await client.post('/api/v1/subscriptions').loginAs(user).json({ feed_url: feedUrl })

    const subscriptions = await user.related('subscriptions').query()
    assert.lengthOf(subscriptions, 1)
    response.assertStatus(200)
  })
})

