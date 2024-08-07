import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

type callBack = (...args: any[]) => Promise<any>;
export function cache<T extends callBack>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
) {
  return nextCache(reactCache(cb), keyParts, options);
}
