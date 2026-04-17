import vine from '@vinejs/vine'

export const taggingIdValidator = vine.create(
  vine.object({
    id: vine.number(),
  })
)

export const createTaggingValidator = vine.create(
  vine.object({
    feed_id: vine.number(),
    name: vine.string().trim().minLength(1).maxLength(255),
  })
)
