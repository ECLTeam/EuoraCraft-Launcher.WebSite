import type { ReleaseDetectionState } from '~/types/releases'
import { parseReleases } from '~/utils/releases'

const RELEASE_API = 'https://api.github.com/repos/ECLTeam/EuoraCraft-Launcher/releases?per_page=100'
let pendingRequest: Promise<void> | undefined

export function useReleaseDetection() {
  const state = useState<ReleaseDetectionState>('ecl-release-detection', () => ({
    releases: [], status: 'idle', checkedAt: null, attemptedAt: null
  }))

  function check(force = false): Promise<void> {
    if (pendingRequest) return pendingRequest
    const age = Date.now() - (state.value.attemptedAt ?? 0)
    if (!force && age < (state.value.status === 'error' ? 60_000 : 300_000)) return Promise.resolve()
    state.value.status = 'loading'
    state.value.attemptedAt = Date.now()
    pendingRequest = (async () => {
      try {
        const response = await $fetch<unknown>(RELEASE_API, {
          headers: { 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
          timeout: 10_000,
          retry: 0
        })
        state.value.releases = parseReleases(response)
        state.value.checkedAt = Date.now()
        state.value.status = 'ready'
      } catch {
        state.value.status = 'error'
      } finally {
        pendingRequest = undefined
      }
    })()
    return pendingRequest
  }

  onMounted(() => {
    void check()
  })

  return {
    releases: computed(() => state.value.releases),
    latestRelease: computed(() => state.value.releases[0]),
    status: computed(() => state.value.status),
    checkedAt: computed(() => state.value.checkedAt),
    check
  }
}
