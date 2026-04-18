import vine from '@vinejs/vine'

export const feedEntriesPaginationValidator = vine.compile(
    vine.object({
        page: vine.number().positive().optional(),
        per_page: vine.number().positive().max(100).optional(),
        since: vine.date({
            formats: ['iso8601']
        }).optional(),
    })
)