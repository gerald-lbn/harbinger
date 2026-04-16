import Feed from '#models/feed'
import Subscription from '#models/subscription'
import type User from '#models/user'
import type { FeedOption } from '#services/feed_discovery_service'
import { inject } from '@adonisjs/core'

export type SubscribeResult = { status: 201 | 302; subscription: Subscription }

@inject()
export class SubscriptionService {
  getUserSubscriptions(user: User): Promise<Subscription[]> {
    return user.related('subscriptions').query().preload('feed').orderBy('created_at', 'desc')
  }

  getUserSubscriptionAndFeedById(user: User, id: number): Promise<Subscription | null> {
    return user.related('subscriptions').query().where('id', id).preload('feed').first()
  }

  async updateUserSubscriptionTitle(
    user: User,
    id: number,
    title: string
  ): Promise<Subscription | null> {
    const subscription = await user
      .related('subscriptions')
      .query()
      .where('id', id)
      .preload('feed')
      .first()

    if (!subscription) return null
    return subscription.merge({ title }).save()
  }

  async deleteUserSubscriptionById(user: User, id: number): Promise<boolean> {
    const subscription = await user.related('subscriptions').query().where('id', id).first()
    if (!subscription) return false
    await subscription.delete()
    return true
  }

  /**
   * Subscribes a user to a resolved feed.
   */
  async subscribe(user: User, feedOption: FeedOption): Promise<SubscribeResult> {
    const { feed_url, title: discoveryTitle } = feedOption

    const feed = await Feed.firstOrCreate(
      { url: feed_url },
      {
        title: discoveryTitle,
        site: new URL(feed_url).origin,
      }
    )

    const existingSubscription = await user
      .related('subscriptions')
      .query()
      .where('feedId', feed.id)
      .preload('feed')
      .first()

    if (existingSubscription) {
      return { status: 302, subscription: existingSubscription }
    }

    const subscription = await user.related('subscriptions').create({
      feedId: feed.id,
      title: discoveryTitle || feed.title || 'Untitled',
    })

    await subscription.load('feed')

    return { status: 201, subscription }
  }
}
