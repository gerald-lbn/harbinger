// From @vinejs/vine/types
export type SimpleError = {
	/** The human-readable error message */
	message: string
	/** The field path where the error occurred (dot notation) */
	field: string
	/** The name of the validation rule that failed */
	rule: string
	/** The array index if this error is for an array element */
	index?: number
	/** Additional metadata about the error (e.g., attempted value, rule options) */
	meta?: Record<string, unknown>
}

// Convert an array of SimpleError into a prettified error type i.e { <field>: <message> }
export type PrettifiedError<K extends string> = {
	[P in K]?: Omit<SimpleError, 'field'>
}
