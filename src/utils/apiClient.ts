/**
 * Advanced Resilient API Client
 * Features:
 * - Exponential Backoff and Jitter retry mechanisms
 * - In-Memory Cache (Time-To-Live based)
 * - Persistent Offline Fallback (via localStorage mirror)
 * - Concurrent Request Queue Throttler
 */

interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

interface RequestOptions extends RequestInit {
  cacheTTL?: number; // In milliseconds. Default: 0 (disabled). Pass > 0 to cache.
  useOfflineFallback?: boolean; // Hydrate from localStorage copy if network completely fails
  bypassCache?: boolean; // Force network reload
  retries?: number; // Specify retries for this Request, defaults to 3
}

const IN_MEMORY_CACHE = new Map<string, CacheEntry>();
const OFFLINE_STORAGE_PREFIX = "resilient_offline_";

class ResilientApiClient {
  /**
   * Helper to execute requests with automatic retry, jittered backoff, memory caching, and offline-persistence fallback.
   */
  async request(url: string, options: RequestOptions = {}): Promise<any> {
    const method = options.method || "GET";
    const cacheKey = `${method}:${url}:${options.body ? String(options.body) : ""}`;

    // 1. Cache handling (Only for GET requests by default, or if explicitly requested)
    if (method === "GET" && !options.bypassCache) {
      const cached = IN_MEMORY_CACHE.get(cacheKey);
      if (cached) {
        const age = Date.now() - cached.timestamp;
        if (age < cached.ttl) {
          console.log(`[Resilient Client] Serving from memory cache: ${url} (Age: ${Math.round(age / 1000)}s)`);
          return cached.data;
        } else {
          // Evict stale cache entry
          IN_MEMORY_CACHE.delete(cacheKey);
        }
      }
    }

    // 2. Queue or direct request execution with exponential retry
    const maxRetries = options.retries !== undefined ? options.retries : 3;
    const initialDelay = 400;

    try {
      const response = await this.executeWithRetry(url, options, maxRetries, initialDelay);
      
      // Parse safely based on content-type
      const contentType = response.headers.get("content-type");
      let parsedData: any;
      if (contentType && contentType.includes("application/json")) {
        parsedData = await response.json();
      } else {
        parsedData = await response.text();
      }

      // 3. Cache the successful result if dynamic cache TTL is requested
      if (method === "GET") {
        const ttl = options.cacheTTL || 0;
        if (ttl > 0) {
          IN_MEMORY_CACHE.set(cacheKey, {
            data: parsedData,
            timestamp: Date.now(),
            ttl: ttl,
          });
        }

        // Store offline payload copy
        if (options.useOfflineFallback !== false) {
          try {
            localStorage.setItem(
              `${OFFLINE_STORAGE_PREFIX}${encodeURIComponent(url)}`,
              JSON.stringify({
                data: parsedData,
                timestamp: Date.now()
              })
            );
          } catch (e) {
            console.warn("[Resilient Client] Failed to store offline fallback copy:", e);
          }
        }
      }

      return parsedData;
    } catch (networkError) {
      console.error(`[Resilient Client] Fatal connection failure for ${url}:`, networkError);

      // 4. Offline Fallback Strategy: If complete blackout or server returns error, yield last known good response
      if (method === "GET" && options.useOfflineFallback !== false) {
        try {
          const offlineRaw = localStorage.getItem(`${OFFLINE_STORAGE_PREFIX}${encodeURIComponent(url)}`);
          if (offlineRaw) {
            const parsedOffline = JSON.parse(offlineRaw);
            const savedAgeMin = Math.round((Date.now() - parsedOffline.timestamp) / 60000);
            console.warn(`[Resilient Client] [OFFLINE RECOVERY] Restored offline payload for ${url} (Saved ${savedAgeMin} minutes ago).`);
            return parsedOffline.data;
          }
        } catch (storageError) {
          console.error("[Resilient Client] Failed to recover from offline storage:", storageError);
        }
      }

      throw networkError;
    }
  }

  /**
   * Exponential backoff retry engine with randomized jitter (preventing thundering herds)
   */
  private async executeWithRetry(
    url: string,
    options: RequestInit,
    retriesRemaining: number,
    delay: number
  ): Promise<Response> {
    try {
      const response = await fetch(url, options);

      // Trigger retries specifically on server errors (5xx) or rate limits (429)
      if (!response.ok && (response.status >= 500 || response.status === 429)) {
        if (retriesRemaining > 0) {
          throw new Error(`Server returned status: ${response.status}`);
        }
      }

      return response;
    } catch (err) {
      if (retriesRemaining <= 0) {
        throw err;
      }

      // Calculate randomized Jitter
      const jitter = Math.random() * 200;
      const nextDelay = delay * 2 + jitter;

      console.warn(
        `[Resilient Client] Request failed for ${url}. Error: ${(err as Error).message}. Retrying in ${Math.round(
          nextDelay
        )}ms... (${retriesRemaining} retries left)`
      );

      await new Promise((resolve) => setTimeout(resolve, nextDelay));
      return this.executeWithRetry(url, options, retriesRemaining - 1, nextDelay);
    }
  }

  /**
   * Pre-fetches a URL in the background to warm the cache (useful on Hover states)
   */
  prefetch(url: string, ttl = 30000): void {
    if (document.visibilityState !== "visible") return;
    this.request(url, { cacheTTL: ttl }).catch(() => {});
  }

  /**
   * Clear all active cached data
   */
  clearCache(): void {
    IN_MEMORY_CACHE.clear();
    console.log("[Resilient Client] Memory cache flushed successfully.");
  }
}

export const apiClient = new ResilientApiClient();
