import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'feeds.feeds.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'feeds.entries.index': { paramsTuple: [ParamValue]; params: {'feed_id': ParamValue} }
    'subscriptions.subscriptions.index': { paramsTuple?: []; params?: {} }
    'subscriptions.subscriptions.store': { paramsTuple?: []; params?: {} }
    'subscriptions.subscriptions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subscriptions.subscriptions.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subscriptions.subscriptions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recently_read_entries.recently_read_entries.index': { paramsTuple?: []; params?: {} }
    'recently_read_entries.recently_read_entries.store': { paramsTuple?: []; params?: {} }
    'starred_entries.starred_entries.index': { paramsTuple?: []; params?: {} }
    'starred_entries.starred_entries.store': { paramsTuple?: []; params?: {} }
    'starred_entries.starred_entries.destroy': { paramsTuple?: []; params?: {} }
    'taggings.taggings.index': { paramsTuple?: []; params?: {} }
    'taggings.taggings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'taggings.taggings.store': { paramsTuple?: []; params?: {} }
    'taggings.taggings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.tags.index': { paramsTuple?: []; params?: {} }
    'tags.tags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.tags.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'feeds.feeds.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'feeds.entries.index': { paramsTuple: [ParamValue]; params: {'feed_id': ParamValue} }
    'subscriptions.subscriptions.index': { paramsTuple?: []; params?: {} }
    'subscriptions.subscriptions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recently_read_entries.recently_read_entries.index': { paramsTuple?: []; params?: {} }
    'starred_entries.starred_entries.index': { paramsTuple?: []; params?: {} }
    'taggings.taggings.index': { paramsTuple?: []; params?: {} }
    'taggings.taggings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.tags.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'feeds.feeds.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'feeds.entries.index': { paramsTuple: [ParamValue]; params: {'feed_id': ParamValue} }
    'subscriptions.subscriptions.index': { paramsTuple?: []; params?: {} }
    'subscriptions.subscriptions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recently_read_entries.recently_read_entries.index': { paramsTuple?: []; params?: {} }
    'starred_entries.starred_entries.index': { paramsTuple?: []; params?: {} }
    'taggings.taggings.index': { paramsTuple?: []; params?: {} }
    'taggings.taggings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.tags.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'subscriptions.subscriptions.store': { paramsTuple?: []; params?: {} }
    'recently_read_entries.recently_read_entries.store': { paramsTuple?: []; params?: {} }
    'starred_entries.starred_entries.store': { paramsTuple?: []; params?: {} }
    'taggings.taggings.store': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'subscriptions.subscriptions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'starred_entries.starred_entries.destroy': { paramsTuple?: []; params?: {} }
    'taggings.taggings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.tags.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'subscriptions.subscriptions.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tags.tags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}