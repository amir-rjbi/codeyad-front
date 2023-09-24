import { StorageSerializers } from '@vueuse/core';
import { IApiResponse } from "./../models/IApiResponse";

export async function useFetchWithCache<T>(
  url: string
): Promise<IApiResponse<T>> {
  // Use sessionStorage to cache data
  const cached = useSessionStorage<T>(url, null, {
    serializer: StorageSerializers.object,
  });
  if (!cached.value) {
    const data = await FetchApi<T>(url);
    // Update the cache
    cached.value = data as T;

  } else {
    console.log(`Getting value from cache for ${url}`);
  }
  return cached.value;
}
