import { isObject } from "./is";
import { DeepMerge } from "./types";

function isMergableObject(item: any): item is object {
  return isObject(item) && !Array.isArray(item);
}

export function deepMerge<T extends object = object, S extends object = T>(target: T, ...sources: S[]): DeepMerge<T, S> {
  if (!sources.length)
    return target as any

  const source = sources.shift()
  if (source === undefined)
    return target as any

  if (isMergableObject(target) && isMergableObject(source)) {
    Object.keys(source).forEach((key) => {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype')
        return

      // @ts-expect-error
      if (isMergableObject(source[key])) {
        // @ts-expect-error
        if (!target[key])
          // @ts-expect-error
          target[key] = {}

        // @ts-expect-error
        if (isMergableObject(target[key])) {
          // @ts-expect-error
          deepMerge(target[key], source[key])
        }
        else {
          // @ts-expect-error
          target[key] = source[key]
        }
      }
      else {
        // @ts-expect-error
        target[key] = source[key]
      }
    })
  }

  return deepMerge(target, ...sources)
}
