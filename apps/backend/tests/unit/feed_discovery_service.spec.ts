import { test } from '@japa/runner'
import { FeedDiscoveryService } from '#services/feed_discovery_service'

test.group('Feed discovery service', (group) => {
  let originalFetch: typeof global.fetch

  group.each.setup(() => {
    originalFetch = global.fetch
    return () => {
      global.fetch = originalFetch
    }
  })

  test('discover returns a direct feed if the URL points to a valid feed', async ({ assert }) => {
    const service = new FeedDiscoveryService()
    const feedUrl = 'https://example.com/feed.xml'
    const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Example Feed</title></channel></rss>`

    global.fetch = async (_input: string | Request | URL, _init?: RequestInit): Promise<Response> => {
      return new Response(xml, {
        headers: { 'content-type': 'application/rss+xml' },
      })
    }

    const result = await service.discover(feedUrl)

    assert.lengthOf(result, 1)
    assert.deepEqual(result[0], { feed_url: feedUrl, title: 'Example Feed' })
  })

  test('discover extracts feed from HTML alternate links', async ({ assert }) => {
    const service = new FeedDiscoveryService()
    const siteUrl = 'https://example.com'
    const html = `
      <html>
        <head>
          <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml">
          <title>Example Page</title>
        </head>
      </html>
    `

    global.fetch = async (_input: string | Request | URL, _init?: RequestInit): Promise<Response> => {
      return new Response(html, {
        headers: { 'content-type': 'text/html' },
      })
    }

    const result = await service.discover(siteUrl)

    assert.lengthOf(result, 1)
    assert.deepEqual(result[0], { feed_url: 'https://example.com/rss.xml', title: 'RSS Feed' })
  })

  test('discover returns multiple options when multiple feeds are linked', async ({ assert }) => {
    const service = new FeedDiscoveryService()
    const siteUrl = 'https://example.com'
    const html = `
      <html>
        <head>
          <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss">
          <link rel="alternate" type="application/atom+xml" title="Atom" href="/atom">
        </head>
      </html>
    `

    global.fetch = async (_input: string | Request | URL, _init?: RequestInit): Promise<Response> => {
      return new Response(html, {
        headers: { 'content-type': 'text/html' },
      })
    }

    const result = await service.discover(siteUrl)

    assert.lengthOf(result, 2)
    assert.deepEqual(result, [
      { feed_url: 'https://example.com/rss', title: 'RSS' },
      { feed_url: 'https://example.com/atom', title: 'Atom' },
    ])
  })

  test('discover returns empty array when no feeds are found in HTML', async ({ assert }) => {
    const service = new FeedDiscoveryService()
    const siteUrl = 'https://example.com'
    const html = `<html><body>No feeds here</body></html>`

    global.fetch = async (_input: string | Request | URL, _init?: RequestInit): Promise<Response> => {
      return new Response(html, {
        headers: { 'content-type': 'text/html' },
      })
    }

    const result = await service.discover(siteUrl)

    assert.lengthOf(result, 0)
  })

  test('discover returns empty array on network error', async ({ assert }) => {
    const service = new FeedDiscoveryService()

    global.fetch = async (_input: string | Request | URL, _init?: RequestInit): Promise<Response> => {
      throw new Error('Network error')
    }

    const result = await service.discover('https://error.com')

    assert.lengthOf(result, 0)
  })
})
