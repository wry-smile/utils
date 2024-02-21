declare type Awaitable<T> = T | PromiseLike<T>

declare type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}

declare type NonNullable<T> = T extends null | undefined ? never : T

declare type ReadonlyRecordable<T> = Readonly<Record<string, T>>

declare type Recordable<T = any> = Record<string, T>

declare type Nullable<T> = T | null | undefined

declare type Arrayable<T> = T | Array<T>

declare type Indexable<T> = Record<string, T>

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
}

declare type Fn<T = void> = () => T

declare type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

declare type MergeInsertions<T> =
  T extends object
  ? { [K in keyof T]: MergeInsertions<T[K]> }
  : T

declare type DeepMerge<F, S> = MergeInsertions<{
  [K in keyof F | keyof S]: K extends keyof S & keyof F
  ? DeepMerge<F[K], S[K]>
  : K extends keyof S
  ? S[K]
  : K extends keyof F
  ? F[K]
  : never;
}>

declare type TimeoutHandle = ReturnType<typeof setTimeout>

declare type IntervalHandle = ReturnType<typeof setInterval>

declare interface LabelValueOptionType {
  label: string
  value: any
  [key: string]: any
}

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

export { Awaitable, Writable, NonNullable, ReadonlyRecordable, Recordable, Nullable, Arrayable, Indexable, DeepPartial, Fn, UnionToIntersection, MergeInsertions, DeepMerge, TimeoutHandle, IntervalHandle, LabelValueOptionType, ElRef }
