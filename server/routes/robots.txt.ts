export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400')

  const host = getRequestHeader(event, 'host') || 'happybouquet.web.id'
  const proto = getRequestHeader(event, 'x-forwarded-proto') || 'https'
  const siteUrl = `${proto}://${host}`

  return `# HappyBouquet Robots Policy
# https://happybouquet.web.id

User-agent: *
Allow: /
Disallow: /api/
Disallow: /checkout/
Disallow: /account/
Disallow: /tracking
Disallow: /maintenance
Disallow: /*?*sort=
Disallow: /*?*filter=

# Crawl Delay for general scrapers
Crawl-delay: 1

# AI Search & LLM Crawlers (Allowed for AI Overviews & Search Retrieval)
User-agent: GPTBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: ChatGPT-User
Allow: /
Allow: /llms.txt

User-agent: PerplexityBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: ClaudeBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: anthropic-ai
Allow: /
Allow: /llms.txt

User-agent: Google-Extended
Allow: /
Allow: /llms.txt

User-agent: Applebot-Extended
Allow: /
Allow: /llms.txt

# Sitemap Reference
Sitemap: ${siteUrl}/sitemap.xml
`
})
