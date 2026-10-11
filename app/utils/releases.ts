import type { WebsiteRelease } from '~/types/releases'

export function parseReleases(response: unknown): WebsiteRelease[] {
  if (!Array.isArray(response)) throw new Error('Invalid release response')
  const releases: WebsiteRelease[] = []
  for (const item of response) {
    if (!item || item.draft || !item.published_at) continue
    if (typeof item.tag_name !== 'string' || !item.tag_name.trim() || typeof item.html_url !== 'string' || !Number.isFinite(Date.parse(item.published_at))) {
      throw new Error('Invalid published release')
    }
    const url = new URL(item.html_url)
    if (url.protocol !== 'https:' || url.hostname !== 'github.com' || !url.pathname.startsWith('/ECLTeam/EuoraCraft-Launcher/releases/tag/')) {
      throw new Error('Invalid release URL')
    }
    releases.push({
      tag: item.tag_name,
      name: typeof item.name === 'string' ? item.name : item.tag_name,
      publishedAt: item.published_at,
      prerelease: item.prerelease === true,
      url: url.href,
      notes: typeof item.body === 'string' ? item.body.trim() : ''
    })
  }
  return releases.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
}
