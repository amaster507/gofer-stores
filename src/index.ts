import surreal, { IDBStoreOptions as surrealOpts } from './stores/surreal'
import file, { IDBStoreOptions as fileOpts } from './stores/file'
import { RequireOnlyOne } from './types'

const stores = {
  surreal,
  file,
} as const

export interface StoreOptions {
  file: fileOpts
  surreal: surrealOpts
}

export type StoreTypes = keyof typeof stores

export type Store = surreal | file

export type StoreConfig = RequireOnlyOne<StoreOptions>

export default stores
