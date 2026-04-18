import vine from '@vinejs/vine'

export const tagIdValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

export const updateTagValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
  })
)
