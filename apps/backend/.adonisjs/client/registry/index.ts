/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_token.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_token.store']['types'],
  },
  'auth.access_token.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_token.destroy']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'feeds.feeds.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/feeds/:id',
    tokens: [{"old":"/api/v1/feeds/:id","type":0,"val":"api","end":""},{"old":"/api/v1/feeds/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/feeds/:id","type":0,"val":"feeds","end":""},{"old":"/api/v1/feeds/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['feeds.feeds.show']['types'],
  },
  'feeds.entries.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/feeds/:feed_id/entries',
    tokens: [{"old":"/api/v1/feeds/:feed_id/entries","type":0,"val":"api","end":""},{"old":"/api/v1/feeds/:feed_id/entries","type":0,"val":"v1","end":""},{"old":"/api/v1/feeds/:feed_id/entries","type":0,"val":"feeds","end":""},{"old":"/api/v1/feeds/:feed_id/entries","type":1,"val":"feed_id","end":""},{"old":"/api/v1/feeds/:feed_id/entries","type":0,"val":"entries","end":""}],
    types: placeholder as Registry['feeds.entries.index']['types'],
  },
  'subscriptions.subscriptions.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/subscriptions',
    tokens: [{"old":"/api/v1/subscriptions","type":0,"val":"api","end":""},{"old":"/api/v1/subscriptions","type":0,"val":"v1","end":""},{"old":"/api/v1/subscriptions","type":0,"val":"subscriptions","end":""}],
    types: placeholder as Registry['subscriptions.subscriptions.index']['types'],
  },
  'subscriptions.subscriptions.store': {
    methods: ["POST"],
    pattern: '/api/v1/subscriptions',
    tokens: [{"old":"/api/v1/subscriptions","type":0,"val":"api","end":""},{"old":"/api/v1/subscriptions","type":0,"val":"v1","end":""},{"old":"/api/v1/subscriptions","type":0,"val":"subscriptions","end":""}],
    types: placeholder as Registry['subscriptions.subscriptions.store']['types'],
  },
  'subscriptions.subscriptions.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/subscriptions/:id',
    tokens: [{"old":"/api/v1/subscriptions/:id","type":0,"val":"api","end":""},{"old":"/api/v1/subscriptions/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/subscriptions/:id","type":0,"val":"subscriptions","end":""},{"old":"/api/v1/subscriptions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['subscriptions.subscriptions.destroy']['types'],
  },
  'subscriptions.subscriptions.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/subscriptions/:id',
    tokens: [{"old":"/api/v1/subscriptions/:id","type":0,"val":"api","end":""},{"old":"/api/v1/subscriptions/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/subscriptions/:id","type":0,"val":"subscriptions","end":""},{"old":"/api/v1/subscriptions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['subscriptions.subscriptions.update']['types'],
  },
  'subscriptions.subscriptions.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/subscriptions/:id',
    tokens: [{"old":"/api/v1/subscriptions/:id","type":0,"val":"api","end":""},{"old":"/api/v1/subscriptions/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/subscriptions/:id","type":0,"val":"subscriptions","end":""},{"old":"/api/v1/subscriptions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['subscriptions.subscriptions.show']['types'],
  },
  'recently_read_entries.recently_read_entries.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/recently_read_entries',
    tokens: [{"old":"/api/v1/recently_read_entries","type":0,"val":"api","end":""},{"old":"/api/v1/recently_read_entries","type":0,"val":"v1","end":""},{"old":"/api/v1/recently_read_entries","type":0,"val":"recently_read_entries","end":""}],
    types: placeholder as Registry['recently_read_entries.recently_read_entries.index']['types'],
  },
  'recently_read_entries.recently_read_entries.store': {
    methods: ["POST"],
    pattern: '/api/v1/recently_read_entries',
    tokens: [{"old":"/api/v1/recently_read_entries","type":0,"val":"api","end":""},{"old":"/api/v1/recently_read_entries","type":0,"val":"v1","end":""},{"old":"/api/v1/recently_read_entries","type":0,"val":"recently_read_entries","end":""}],
    types: placeholder as Registry['recently_read_entries.recently_read_entries.store']['types'],
  },
  'starred_entries.starred_entries.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/starred_entries',
    tokens: [{"old":"/api/v1/starred_entries","type":0,"val":"api","end":""},{"old":"/api/v1/starred_entries","type":0,"val":"v1","end":""},{"old":"/api/v1/starred_entries","type":0,"val":"starred_entries","end":""}],
    types: placeholder as Registry['starred_entries.starred_entries.index']['types'],
  },
  'starred_entries.starred_entries.store': {
    methods: ["POST"],
    pattern: '/api/v1/starred_entries',
    tokens: [{"old":"/api/v1/starred_entries","type":0,"val":"api","end":""},{"old":"/api/v1/starred_entries","type":0,"val":"v1","end":""},{"old":"/api/v1/starred_entries","type":0,"val":"starred_entries","end":""}],
    types: placeholder as Registry['starred_entries.starred_entries.store']['types'],
  },
  'starred_entries.starred_entries.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/starred_entries',
    tokens: [{"old":"/api/v1/starred_entries","type":0,"val":"api","end":""},{"old":"/api/v1/starred_entries","type":0,"val":"v1","end":""},{"old":"/api/v1/starred_entries","type":0,"val":"starred_entries","end":""}],
    types: placeholder as Registry['starred_entries.starred_entries.destroy']['types'],
  },
  'taggings.taggings.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/taggings',
    tokens: [{"old":"/api/v1/taggings","type":0,"val":"api","end":""},{"old":"/api/v1/taggings","type":0,"val":"v1","end":""},{"old":"/api/v1/taggings","type":0,"val":"taggings","end":""}],
    types: placeholder as Registry['taggings.taggings.index']['types'],
  },
  'taggings.taggings.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/taggings/:id',
    tokens: [{"old":"/api/v1/taggings/:id","type":0,"val":"api","end":""},{"old":"/api/v1/taggings/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/taggings/:id","type":0,"val":"taggings","end":""},{"old":"/api/v1/taggings/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['taggings.taggings.show']['types'],
  },
  'taggings.taggings.store': {
    methods: ["POST"],
    pattern: '/api/v1/taggings',
    tokens: [{"old":"/api/v1/taggings","type":0,"val":"api","end":""},{"old":"/api/v1/taggings","type":0,"val":"v1","end":""},{"old":"/api/v1/taggings","type":0,"val":"taggings","end":""}],
    types: placeholder as Registry['taggings.taggings.store']['types'],
  },
  'taggings.taggings.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/taggings/:id',
    tokens: [{"old":"/api/v1/taggings/:id","type":0,"val":"api","end":""},{"old":"/api/v1/taggings/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/taggings/:id","type":0,"val":"taggings","end":""},{"old":"/api/v1/taggings/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['taggings.taggings.destroy']['types'],
  },
  'tags.tags.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/tags',
    tokens: [{"old":"/api/v1/tags","type":0,"val":"api","end":""},{"old":"/api/v1/tags","type":0,"val":"v1","end":""},{"old":"/api/v1/tags","type":0,"val":"tags","end":""}],
    types: placeholder as Registry['tags.tags.index']['types'],
  },
  'tags.tags.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/tags/:id',
    tokens: [{"old":"/api/v1/tags/:id","type":0,"val":"api","end":""},{"old":"/api/v1/tags/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/tags/:id","type":0,"val":"tags","end":""},{"old":"/api/v1/tags/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tags.tags.update']['types'],
  },
  'tags.tags.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/tags/:id',
    tokens: [{"old":"/api/v1/tags/:id","type":0,"val":"api","end":""},{"old":"/api/v1/tags/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/tags/:id","type":0,"val":"tags","end":""},{"old":"/api/v1/tags/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tags.tags.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
