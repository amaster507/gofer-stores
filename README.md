# Gofer Stores

These stores are meant to be utilized with the [gofer](https://github.com/amaster507/gofer) Engine.

These stores are simplified database connectors to persist HL7 messages.

## Supported Stores

- File, _just raw file storage using `fs`_
- [SurrealDB](https://surrealdb.com/) **Requires a running SurrealDB Server**

## Future Stores Ideas

- [Dgraph](https://dgraph.io)
- [Mongo](https://mongodb.com)
- [Postgres](https://www.postgresql.org/)
- [MySQL](https://www.mysql.com/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server)
- [EdgeDB](https://www.edgedb.com/)
- [TypeDB](https://vaticle.com/typedb)

If you are interested in contributing by building out one of these store connectors, then please see [CONTRIBUTING](https://github.com/amaster507/gofer-stores/CONTRIBUTING.md)

## Support needed for these store(s) to be used for better-queue store(s)

Export an object that contains the following methods:

```ts
interface StoreObj<T> {
  // call the callback (cb) with either error on failure to connect, or with the current length of the tasks in the store on successful connection
  connect(cb: (error: any, length: number) => void): void;
  // call the callback (cb) with either error to retrieve task, or with the task on successful retrieval
  getTask(taskId: any, cb: (error: any, task: T) => void): void;
  // call the callback (cb) after the task has been removed from the store.
  deleteTask(taskId: any, cb: () => void): void;
  // call the callback (cb) with either error on storing the task, or without any arguments on successful storage.
  putTask(taslId: any, task: T, priority: number, cb: (error: any) => void): void;
  // call the callback (cb) with either error on failure to get the batch of tasks, or on success pass the batch id as the `lockid`.
  takeFirstN(n: number, cb: (error: any, lockId: string) => void): void;
  // call the callback (cb) with either error on failure to get the batch of tasks, or on success pass the batch id as the `lockid`. Unique in that it should return the last `n` tasks from the store but in reverse order. FILO.
  takeLastN(n: number, cb: (error: any, lockId: string) => void): void;
  // call the callback (cb) with either error on failure to get the batch of tasks, or on success pass the batched task by the task id as the key for each task in the batch.
  getLock(lockId: string, cb: (error: any, tasks: { [taskId: string]: T }) => void): void;
  // call the callback (cb) with no arguments after the batch of tasks have been removed from the batch store, or retun an error if the batch of tasks could not be removed.
  releaseLock(lockId: string, cb: (error: any) => void): void;
}
```
