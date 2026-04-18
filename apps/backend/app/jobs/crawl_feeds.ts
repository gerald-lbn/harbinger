import { Job } from '@adonisjs/queue'
import type { JobOptions } from '@adonisjs/queue/types'

interface CrawlFeedsPayload {
  // Define your payload type here
}

export default class CrawlFeeds extends Job<CrawlFeedsPayload> {
  static options: JobOptions = {
    queue: 'default',
    maxRetries: 3,
  }

  async execute() {
    // Your job logic here
    console.log('Processing CrawlFeeds', this.payload)
  }

  async failed(error: Error) {
    console.error('CrawlFeeds failed:', error.message)
  }
}