import { FeedDiscoveryService } from '#services/feed_discovery_service'
import { SubscriptionService } from '#services/subscription_service'
import SubscriptionTransformer from '#transformers/subscription_transformer'
import { createSubscriptionValidator, updateSubscriptionValidator } from '#validators/subscription'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SubscriptionsController {
  constructor(
    private subscription_service: SubscriptionService,
    private discovery_service: FeedDiscoveryService
  ) { }

  /**
   * Display a list of resource
   */
  async index({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const subscriptions = await this.subscription_service.getUserSubscriptions(user)

    return serialize(SubscriptionTransformer.transform(subscriptions))
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, response, serialize }: HttpContext) {
    const { feed_url: feedUrl } = await request.validateUsing(createSubscriptionValidator)
    const user = auth.getUserOrFail()

    const options = await this.discovery_service.discover(feedUrl)

    if (options.length === 0) {
      return response.notFound({ message: 'No feed found at the provided URL' })
    }

    if (options.length > 1) {
      return response.multipleChoices({ data: options })
    }

    const { subscription, status } = await this.subscription_service.subscribe(user, options[0])
    const transformed = await serialize(SubscriptionTransformer.transform(subscription))

    response.header('Location', `/api/v1/subscriptions/${subscription.id}`)
    return response.status(status).send(transformed)
  }

  /**
   * Show individual record
   */
  async show({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const subscription = await this.subscription_service.getUserSubscriptionAndFeedById(user, params.id)

    if (!subscription) return response.notFound()

    return serialize(SubscriptionTransformer.transform(subscription))
  }

  /**
   * Edit individual record
   */
  async edit({ }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ auth, params, request, response, serialize }: HttpContext) {
    const { title } = await request.validateUsing(updateSubscriptionValidator)

    const user = auth.getUserOrFail()
    const subscription = await this.subscription_service.updateUserSubscriptionTitle(
      user,
      params.id,
      title
    )

    if (!subscription) return response.notFound()

    return serialize(SubscriptionTransformer.transform(subscription))
  }

  /**
   * Delete record
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const deleted = await this.subscription_service.deleteUserSubscriptionById(user, params.id)
    if (!deleted) return response.notFound()

    return response.noContent()
  }
}
