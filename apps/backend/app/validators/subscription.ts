import vine from '@vinejs/vine'

export const deleteSubscriptionByIdSchema = vine.object({
  id: vine.number(),
})
