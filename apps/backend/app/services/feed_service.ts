import Feed from '#models/feed'

export class FeedService {
  async getFeedById(id: number): Promise<Feed | null> {
    return Feed.query().where('id', id).first()
  }
}
