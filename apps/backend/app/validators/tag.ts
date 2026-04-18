import vine from '@vinejs/vine'

export const updateTagValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
  })
)
