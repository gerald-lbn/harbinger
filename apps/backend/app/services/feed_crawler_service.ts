import { parseFeed } from 'feedsmith'
import { DateTime } from 'luxon'

export type FetchedEntry = {
  author?: string
  title?: string
  createdAt?: DateTime<boolean>
  content?: string
  url?: string
}

export class FeedCrawlerService {
  async crawl(url: string): Promise<FetchedEntry[]> {
    const response = await fetch(url)
    if (!response.ok)
      throw new Error(`Unable to fetch feed with url='${url}'. stastus=${response.status}`)

    const content = await response.text()
    const parsedContent = parseFeed(content)

    const entries: FetchedEntry[] = []
    switch (parsedContent.format) {
      case 'rss': {
        parsedContent.feed.items
          ?.map((item) => ({
            author: item.authors?.[0],
            title: item.title,
            createdAt: item.pubDate ? DateTime.fromJSDate(new Date(item.pubDate)) : undefined,
            content: item.content?.encoded,
            url: item.link,
          }))
          .forEach((entry) => entries.push(entry))
        break
      }
      case 'atom': {
        console.debug(parsedContent.feed.entries?.length)

        parsedContent.feed.entries
          ?.map((item) => ({
            author: item.authors?.[0].name,
            title: item.title,
            createdAt: item.published ? DateTime.fromJSDate(new Date(item.published)) : undefined,
            content: item.content,
            url: item.links?.[0].href,
          }))
          .forEach((entry) => entries.push(entry))
        break
      }
      case 'rdf': {
        throw new Error('RDF is not yet supported')
      }
      case 'json': {
        parsedContent.feed.items
          ?.map((item) => ({
            author: item.authors?.[0].name,
            title: item.title,
            createdAt: item.date_published
              ? DateTime.fromJSDate(new Date(item.date_published))
              : undefined,
            content: item.content_text,
            url: item.url,
          }))
          .forEach((entry) => entries.push(entry))
        break
      }
    }

    return entries
  }
}
