import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'

// TODO: change to use Nuxt Simple Sitemap module
export default defineEventHandler(async event => {
  // Fetch all documents
  const docs = await serverQueryContent(event).find()
  const sitemap = new SitemapStream({
    hostname: 'http://localhost/3000',
  })

  for (const doc of docs) {
    sitemap.write({
      url: doc._path,
      changefreq: 'monthly',
    })
  }
  sitemap.end()

  return streamToPromise(sitemap)
})
