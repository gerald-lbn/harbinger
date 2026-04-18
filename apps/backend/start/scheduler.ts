/*
|--------------------------------------------------------------------------
| Scheduler
|--------------------------------------------------------------------------
|
| This file is used to define scheduled jobs. You can schedule jobs to run
| at specific intervals using cron expressions or duration strings.
|
| Example:
|
|   import SendWeeklyReport from '#jobs/send_weekly_report'
|
|   SendWeeklyReport.schedule({ userId: 1 })
|     .cron('0 9 * * MON')
|     .run()
|
*/
import CrawlFeeds from '#jobs/crawl_feeds'
import env from '#start/env'

CrawlFeeds.schedule({}).cron(env.get('CRON_FEED_CRAWLER')).run()
