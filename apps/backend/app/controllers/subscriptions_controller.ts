import SubscriptionTransformer from '#transformers/subscription_transformer'
import { subscriptionIdSchema, updateSubscriptionSchema } from '#validators/subscription'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class SubscriptionsController {
  /**
   * Display a list of resource
   */
  async index({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const subscriptions = await user
      .related('subscriptions')
      .query()
      .preload('feed')
      .orderBy('created_at', 'desc')

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
    const subscription = await user
      .related('subscriptions')
      .query()
      .where('id', id)
      .preload('feed')
      .first()

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
    const subscription = await user
      .related('subscriptions')
      .query()
      .where('id', id)
      .preload('feed')
      .first()

    if (!subscription) return response.notFound()

    await subscription.merge({ title }).save()
    return serialize(SubscriptionTransformer.transform(subscription))
  }

  /**
   * Delete record
   */
  async destroy({ auth, params, response }: HttpContext) {
    const { id } = await vine.validate({ schema: subscriptionIdSchema, data: params })

    const user = auth.getUserOrFail()
    const subscription = await user.related('subscriptions').query().where('id', id).first()

    if (!subscription) return response.notFound()

    await subscription.delete()
    return response.noContent()
  }
}
