import surreal, { IDBStoreOptions as surrealOpts } from './stores/surreal'
import file, { IDBStoreOptions as fileOpts } from './stores/file'

const stores = {
  surreal,
  file,
} as const

export interface StoreOptions {
  file: fileOpts
  surreal: surrealOpts
}

export type Store = keyof typeof stores

export default stores
