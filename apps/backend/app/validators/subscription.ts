import vine from '@vinejs/vine'

export const subscriptionIdValidator = vine.create(
  vine.object({
    id: vine.number(),
  })
)

export const updateSubscriptionValidator = vine.create(
  vine.object({
    id: vine.number(),
    title: vine.string().trim().minLength(1).maxLength(255),
  })
)

export const createSubscriptionValidator = vine.create(
  vine.object({
    feed_url: vine.string().trim().minLength(1),
  })
)
