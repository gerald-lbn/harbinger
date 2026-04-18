/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'feeds.feeds.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/feeds/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/feeds_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/feeds_controller').default['show']>>>
    }
  }
  'feeds.entries.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/feeds/:feed_id/entries'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { feed_id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/entry').feedEntriesPaginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/entries_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'subscriptions.subscriptions.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/subscriptions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subscriptions_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subscriptions_controller').default['index']>>>
    }
  }
  'subscriptions.subscriptions.store': {
    methods: ["POST"]
    pattern: '/api/v1/subscriptions'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/subscription').createSubscriptionValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/subscription').createSubscriptionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subscriptions_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subscriptions_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'subscriptions.subscriptions.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/subscriptions/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subscriptions_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subscriptions_controller').default['destroy']>>>
    }
  }
  'subscriptions.subscriptions.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/subscriptions/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/subscription').updateSubscriptionValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/subscription').updateSubscriptionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subscriptions_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subscriptions_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'subscriptions.subscriptions.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/subscriptions/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subscriptions_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/subscriptions_controller').default['show']>>>
    }
  }
  'recently_read_entries.recently_read_entries.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/recently_read_entries'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recently_read_entries_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recently_read_entries_controller').default['index']>>>
    }
  }
  'recently_read_entries.recently_read_entries.store': {
    methods: ["POST"]
    pattern: '/api/v1/recently_read_entries'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/recently_read_entry').createRecentlyReadEntriesValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/recently_read_entry').createRecentlyReadEntriesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recently_read_entries_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recently_read_entries_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'starred_entries.starred_entries.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/starred_entries'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/starred_entries_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/starred_entries_controller').default['index']>>>
    }
  }
  'starred_entries.starred_entries.store': {
    methods: ["POST"]
    pattern: '/api/v1/starred_entries'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/starred_entry').createStarredEntriesValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/starred_entry').createStarredEntriesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/starred_entries_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/starred_entries_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'starred_entries.starred_entries.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/starred_entries'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/starred_entry').deleteStarredEntriesValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/starred_entry').deleteStarredEntriesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/starred_entries_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/starred_entries_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'taggings.taggings.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/taggings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/taggings_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/taggings_controller').default['index']>>>
    }
  }
  'taggings.taggings.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/taggings/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/taggings_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/taggings_controller').default['show']>>>
    }
  }
  'taggings.taggings.store': {
    methods: ["POST"]
    pattern: '/api/v1/taggings'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/tagging').createTaggingValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/tagging').createTaggingValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/taggings_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/taggings_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'taggings.taggings.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/taggings/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/taggings_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/taggings_controller').default['destroy']>>>
    }
  }
  'tags.tags.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/tags'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['index']>>>
    }
  }
  'tags.tags.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/tags/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/tag').updateTagValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/tag').updateTagValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'tags.tags.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/tags/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tags_controller').default['destroy']>>>
    }
  }
}
