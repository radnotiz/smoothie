import { Inject, Injectable, InjectionToken } from '@angular/core';

export const CACHE_SIZE_LIMIT = new InjectionToken<string>('cache.size.limit');

@Injectable({
  providedIn: 'root'
})
export class CacheService<K, V> {

  cache: Map<K, V> = new Map<K, V>();

  constructor(@Inject(CACHE_SIZE_LIMIT) private cacheSizeLimit: number) { }

  get leastRecentlyUsedKey(): K {
    return this.cache.keys().next().value
  }

  has(key: K){
    return this.cache.has(key);
  }

  set(key: K, value: V) {
    if (this.cache.size >= this.cacheSizeLimit) {
      this.cache.delete(this.leastRecentlyUsedKey);
    }
    this.cache.set(key, value);

    return value;
  }

  peek(key: K) {
    const value: V = this.cache.get(key)
    this.cache.delete(key);
    this.cache.set(key, value);
  }

  get(key: K): V {
    if (this.cache.has(key)) {
      this.peek(key);
    }
    return this.cache.get(key)
  }
}
