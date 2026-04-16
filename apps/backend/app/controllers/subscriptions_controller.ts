import { SubscriptionService } from '#services/subscription_service'
import SubscriptionTransformer from '#transformers/subscription_transformer'
import { subscriptionIdSchema, updateSubscriptionSchema } from '#validators/subscription'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

@inject()
export default class SubscriptionsController {
  constructor(private subscription_service: SubscriptionService) {}

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
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ auth, params, response, serialize }: HttpContext) {
    const { id } = await vine.validate({
      schema: subscriptionIdSchema,
      data: params,
    })

    const user = auth.getUserOrFail()
    const subscription = await this.subscription_service.getUserSubscriptionAndFeedById(user, id)

    if (!subscription) return response.notFound()

    return serialize(SubscriptionTransformer.transform(subscription))
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ auth, params, request, response, serialize }: HttpContext) {
    const { id, title } = await vine.validate({
      schema: updateSubscriptionSchema,
      data: { ...params, ...request.body() },
    })

    const user = auth.getUserOrFail()
    const subscription = await this.subscription_service.updateUserSubscriptionTitle(user, id, title)

    if (!subscription) return response.notFound()

    return serialize(SubscriptionTransformer.transform(subscription))
  }

  /**
   * Delete record
   */
  async destroy({ auth, params, response }: HttpContext) {
    const { id } = await vine.validate({ schema: subscriptionIdSchema, data: params })
    const user = auth.getUserOrFail()

    const deleted = await this.subscription_service.deleteUserSubscriptionById(user, id)
    if (!deleted) return response.notFound()

    return response.noContent()
  }
}
