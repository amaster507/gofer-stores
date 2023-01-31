# Contributing

Here are the steps to follow to create a new store

1. Create your store `.ts` file in the `src/stores/` directory
2. Create and export your `IDBStoreOptions` interface extending the `StoreOption` interface.
3. Create your `DBStore` class with the following attributes:
   - The `constructor` function needs to accept your `IDBStoreOptions` interface as the input.
   - There needs to be a public `store` function that complies to the `StoreFunc` type.
4. Export your `DBStore` class as the default export.
5. Modify the `src/index.ts` file with the following:
   - Import your store's default export as the same name of your store. eg: `sql`
   - Import your store's `IDBStoreOptions` following the same naming conventions. eg: `sqlOpts`
   - Add your store to the `stores` object.
   - Add your store options to the `StoreOptions` object. The key should be the same as the name of your store.
6. If applicable, create a `package.json` script to start a docker run for your storage solution. Refer to: `sureal:test`.
7. If applicable, update the `pretest` script to include your docker run script.
8. Create a jest test in the `tests` folder for your store. This test should at the bare minimum, store the `sample.hl7` file in your store, then retrieve it, and compare it with the sample to ensure that the storage and retrieval messages map.
9. Update the `README.md`
10. Create a PR against this repo with your new changes.
