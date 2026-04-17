import vine from '@vinejs/vine'

export const createRecentlyReadEntriesValidator = vine.compile(
  vine.object({
    recently_read_entries: vine.array(vine.number().positive()),
  })
)