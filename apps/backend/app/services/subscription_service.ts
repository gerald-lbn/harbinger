import type Subscription from '#models/subscription'
import type User from '#models/user'

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
}
