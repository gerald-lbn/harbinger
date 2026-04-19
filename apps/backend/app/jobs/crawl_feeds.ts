import type Feed from '#models/feed'
import { FeedCrawlerService } from '#services/feed_crawler_service'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import { Database } from '@adonisjs/lucid/database'
import { Job } from '@adonisjs/queue'
import type { JobOptions } from '@adonisjs/queue/types'

interface CrawlFeedsPayload {}

@inject()
export default class CrawlFeeds extends Job<CrawlFeedsPayload> {
  static options: JobOptions = {
    queue: 'default',
    maxRetries: 3,
  }

  constructor(
    private logger: Logger,
    private db: Database,
    private feed_crawler_service: FeedCrawlerService
  ) {
    super()
  }

  async execute() {
    this.logger.info('Processing CrawlFeeds', this.payload)
    const feeds = (await this.db.from('feeds')) as Feed[]
    this.logger.info(`Found ${feeds.length} feeds`)

    for (const feed of feeds) {
      try {
        const entries = await this.feed_crawler_service.crawl(feed.url)
        this.logger.info(
          `Found ${entries.length} ${entries.length > 1 ? 'entries' : 'entry'} for feed with url='${feed.url}'`
        )

        const beforeCountResult = await this.db.from('entries').count('* as total')
        const beforeCount = beforeCountResult[0].total

        if (entries.length > 0) {
          await this.db
            .table('entries')
            .insert(
              entries.map((entry) => ({
                feed_id: feed.id,
                url: entry.url,
                title: entry.title,
                author: entry.author,
                content: entry.content,
                created_at: entry.createdAt ? entry.createdAt.toSQL() : DateTime.now().toSQL(),
              }))
            )
            .onConflict(['feed_id', 'url'])
            .ignore()

          const afterCountResult = await this.db.from('entries').count('* as total')
          const afterCount = afterCountResult[0].total
          const insertedCount = afterCount - beforeCount

          this.logger.info(`Inserted ${insertedCount} new entries for feed with url='${feed.url}'`)
        }
      } catch (e) {
        this.logger.error('Failed to crawl feed reason', e)
      }
    }
  }

  async failed(error: Error) {
    this.logger.error('CrawlFeeds failed:', error.message)
  }
}
