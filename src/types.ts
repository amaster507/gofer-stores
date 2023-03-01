import Msg from 'ts-hl7'

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StoreFunc = (data: Msg, id?: string) => Promise<boolean>

/**
 * @param id - When defined in the Store Config, this id prop accepts a HL7 reference like `$MSH-10.1`. Or can also use `UUID` to generate a universally unique identifier.
 * @ignore Some stores may not support externally assigned identifiers, so then `id` should simply be ignored.
 * @todo Support multiple HL7 references in a formatted reference like `${MSH-9.1}_${MSH-10-1}`
 */
export interface StoreOption {
  id?: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ExportableDB<T> {
  // call the callback (cb) with either error on failure to connect, or with the current length of the tasks in the store on successful connection
  connect(cb: (error: any, length: number) => void): void
  // call the callback (cb) with either error to retrieve task, or with the task on successful retrieval
  getTask(taskId: any, cb: (error: any, task: T) => void): void
  // call the callback (cb) after the task has been removed from the store.
  deleteTask(taskId: any, cb: () => void): void
  // call the callback (cb) with either error on storing the task, or without any arguments on successful storage.
  putTask(
    taslId: any,
    task: T,
    priority: number,
    cb: (error: any) => void
  ): void
  // call the callback (cb) with either error on failure to get the batch of tasks, or on success pass the batch id as the `lockid`.
  takeFirstN(n: number, cb: (error: any, lockId: string) => void): void
  // call the callback (cb) with either error on failure to get the batch of tasks, or on success pass the batch id as the `lockid`. Unique in that it should return the last `n` tasks from the store but in reverse order. FILO.
  takeLastN(n: number, cb: (error: any, lockId: string) => void): void
  // call the callback (cb) with either error on failure to get the batch of tasks, or on success pass the batched task by the task id as the key for each task in the batch.
  getLock(
    lockId: string,
    cb: (error: any, tasks: { [taskId: string]: T }) => void
  ): void
  // call the callback (cb) with no arguments after the batch of tasks have been removed from the batch store, or retun an error if the batch of tasks could not be removed.
  releaseLock(lockId: string, cb: (error: any) => void): void
}
/* eslint-enable @typescript-eslint/no-explicit-any */
