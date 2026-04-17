import vine from '@vinejs/vine'

export const createStarredEntriesValidator = vine.compile(
  vine.object({
    starred_entries: vine.array(vine.number().positive()),
  })
)

export const deleteStarredEntriesValidator = vine.compile(
  vine.object({
    starred_entries: vine.array(vine.number().positive()),
  })
)
