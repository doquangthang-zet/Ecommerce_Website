import { CronJob } from 'cron'

// Schedule a job to wake server up every 14 minutes.
const job = CronJob.from({
  cronTime: '0 */14 * * * *',
  onTick: async function () {
    console.log('Wake up bro!')
    const res = fetch('https://ecommerce-website-5f10.onrender.com/')
  },
  start: true,
  timeZone: 'America/Los_Angeles'
})
