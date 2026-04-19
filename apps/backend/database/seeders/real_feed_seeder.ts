import Feed from '#models/feed'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Feed.createMany([
      {
        site: 'https://www.joshwcomeau.com',
        title: 'Josh Comeau',
        url: 'https://www.joshwcomeau.com/rss.xml',
      },
      {
        site: 'https://frame.work',
        title: 'Framework | Framework Computer | Modular Laptops & PCs You Can Repair',
        url: 'https://frame.work/blog.rss',
      },
    ])
  }
}
