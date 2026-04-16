import { parseFeed } from 'feedsmith'
import * as cheerio from 'cheerio'

export interface FeedOption {
  feed_url: string
  title: string
}

export class FeedDiscoveryService {
  /**
   * Discovers feeds from a given URL.
   * Can be a direct feed URL or a website URL with alternate links.
   */
  async discover(url: string): Promise<FeedOption[]> {
    try {
      const response = await fetch(url)
      if (!response.ok) return []

      const contentType = response.headers.get('content-type') || ''
      const content = await response.text()

      try {
        const feed = parseFeed(content)
        if (feed) {
          return [{ feed_url: url, title: feed.feed.title || 'Untitled Feed' }]
        }
      } catch (e) {
      }

      if (contentType.includes('text/html') || content.trim().startsWith('<')) {
        const $ = cheerio.load(content)
        const links: FeedOption[] = []

        $('link[rel="alternate"]').each((_, el) => {
          const type = $(el).attr('type')
          const href = $(el).attr('href')
          const title = $(el).attr('title') || $('title').text() || 'Untitled Feed'

          if (
            href &&
            (type === 'application/rss+xml' ||
              type === 'application/atom+xml' ||
              type === 'application/feed+json' ||
              type === 'application/json')
          ) {
            const absoluteUrl = new URL(href, url).href
            links.push({ feed_url: absoluteUrl, title })
          }
        })

        return links
      }

      return []
    } catch (error) {
      return []
    }
  }
}
