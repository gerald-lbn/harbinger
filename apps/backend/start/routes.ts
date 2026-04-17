/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessToken, 'store'])
        router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('/profile', [controllers.Profile, 'show'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    router
      .group(() => {
        router.get(':id', [controllers.Feeds, 'show'])
        router.get(':feed_id/entries', [controllers.Entries, 'index'])
      })
      .prefix('feeds')
      .as('feeds')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('', [controllers.Subscriptions, 'index'])
        router.post('', [controllers.Subscriptions, 'store'])
        router.delete(':id', [controllers.Subscriptions, 'destroy'])
        router.patch(':id', [controllers.Subscriptions, 'update'])
        router.get(':id', [controllers.Subscriptions, 'show'])
      })
      .prefix('subscriptions')
      .as('subscriptions')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('', [controllers.RecentlyReadEntries, 'index'])
        router.post('', [controllers.RecentlyReadEntries, 'store'])
      })
      .prefix('recently_read_entries')
      .as('recently_read_entries')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('', [controllers.StarredEntries, 'index'])
        router.post('', [controllers.StarredEntries, 'store'])
        router.delete('', [controllers.StarredEntries, 'destroy'])
      })
      .prefix('starred_entries')
      .as('starred_entries')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
