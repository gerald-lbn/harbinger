/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
  }
  feeds: {
    feeds: {
      show: typeof routes['feeds.feeds.show']
    }
    entries: {
      index: typeof routes['feeds.entries.index']
    }
  }
  subscriptions: {
    subscriptions: {
      index: typeof routes['subscriptions.subscriptions.index']
      store: typeof routes['subscriptions.subscriptions.store']
      destroy: typeof routes['subscriptions.subscriptions.destroy']
      update: typeof routes['subscriptions.subscriptions.update']
      show: typeof routes['subscriptions.subscriptions.show']
    }
  }
  recentlyReadEntries: {
    recentlyReadEntries: {
      index: typeof routes['recently_read_entries.recently_read_entries.index']
      store: typeof routes['recently_read_entries.recently_read_entries.store']
    }
  }
  starredEntries: {
    starredEntries: {
      index: typeof routes['starred_entries.starred_entries.index']
      store: typeof routes['starred_entries.starred_entries.store']
      destroy: typeof routes['starred_entries.starred_entries.destroy']
    }
  }
  taggings: {
    taggings: {
      index: typeof routes['taggings.taggings.index']
      show: typeof routes['taggings.taggings.show']
      store: typeof routes['taggings.taggings.store']
      destroy: typeof routes['taggings.taggings.destroy']
    }
  }
  tags: {
    tags: {
      index: typeof routes['tags.tags.index']
      update: typeof routes['tags.tags.update']
      destroy: typeof routes['tags.tags.destroy']
    }
  }
}
