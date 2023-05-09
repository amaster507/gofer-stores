import Msg from 'ts-hl7'
import fs from 'fs'
import stores from '../src'
import Surreal from 'surrealdb.js'
import { MessageMeta, Segments } from 'ts-hl7/dist/types/types'

const sdb = new Surreal('http://127.0.0.1:8000/rpc')

const hl7 = fs.readFileSync('./sample.hl7', 'utf8')

const msg = new Msg(hl7)

test('store', async () => {
  await sdb.signin({ user: 'root', pass: 'root' })
  await sdb.use('test', 'test')
  const existing = await sdb.query<({ id: string }[])[]>(
    'SELECT id FROM test:MSGID002;'
  )
  const id = existing?.[0]?.result?.[0]?.id
  if (id) {
    sdb.delete(id)
  }
  const db = new stores.surreal()
  return db.store(msg).then(async () => {
    const storedRecord = await sdb.query<({ meta: MessageMeta, segs: Segments }[])[]>('SELECT meta, msg as segs FROM test')
    const { meta, segs } = storedRecord?.[0].result?.[0] ?? {}
    sdb.close()
    const msg = new Msg([meta as MessageMeta, segs as Segments])
    expect(msg.toString()).toBe(hl7)
  })
})
