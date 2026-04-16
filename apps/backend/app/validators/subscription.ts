import vine from '@vinejs/vine'

export const subscriptionIdSchema = vine.object({
  id: vine.number(),
})

export const updateSubscriptionSchema = vine.object({
  id: vine.number(),
  title: vine.string().trim().minLength(1).maxLength(255),
})
