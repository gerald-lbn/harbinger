import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import { Job } from '@adonisjs/queue'
import type { JobOptions } from '@adonisjs/queue/types'

interface CrawlFeedsPayload {}

@inject()
export default class CrawlFeeds extends Job<CrawlFeedsPayload> {
  static options: JobOptions = {
    queue: 'default',
    maxRetries: 3,
  }

  constructor(private logger: Logger) {
    super()
  }

  async execute() {
    this.logger.info('Processing CrawlFeeds', this.payload)
  }

  async failed(error: Error) {
    this.logger.error('CrawlFeeds failed:', error.message)
  }
}
