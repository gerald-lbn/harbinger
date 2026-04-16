import SubscriptionTransformer from '#transformers/subscription_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class SubscriptionsController {
  /**
   * Display a list of resource
   */
  async index({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const subscriptions = await user.related('subscriptions').query().orderBy('created_at', 'desc')

    return serialize(subscriptions.map((sub) => SubscriptionTransformer.transform(sub)))
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
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
