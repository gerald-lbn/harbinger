import vine from '@vinejs/vine'

export const updateSubscriptionValidator = vine.create(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255),
  })
)

export const createSubscriptionValidator = vine.create(
  vine.object({
    feed_url: vine.string().trim().minLength(1),
  })
)
