export interface WebsiteRelease {
  tag: string
  name: string
  publishedAt: string
  prerelease: boolean
  url: string
  notes: string
}

export interface ReleaseDetectionState {
  releases: WebsiteRelease[]
  status: 'idle' | 'loading' | 'ready' | 'error'
  checkedAt: number | null
  attemptedAt: number | null
}
