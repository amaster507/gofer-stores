import Msg from 'ts-hl7'
import fs from 'fs'
import stores from '../src'
import { MongoClient, Document, ObjectId } from 'mongodb'
import { MessageMeta, Segments, StrictMessage } from 'ts-hl7/dist/types/types'

const mongo = new MongoClient('mongodb://127.0.0.1:27017')

const hl7 = fs.readFileSync('./sample.hl7', 'utf8')

const msg = new Msg(hl7)

interface DocAllowCustomId extends Document {
  _id?: string | ObjectId
}

const main = async () => {
  const client = await mongo.connect()
  const collection = client.db('test').collection<DocAllowCustomId>('test')
  const count = await collection.countDocuments()
  if (count > 0) {
    await collection.drop()
  }
  const db = new stores.mongo({ database: 'test', id: '$MSH-10.1' })
  return db.store(msg).then(async (res) => {
    const storedRecord = await collection.findOne({ _id: 'MSGID002' })
    const { meta = undefined, segments = undefined } = storedRecord === null ? {} : storedRecord
    let msg = new Msg()
    if (meta && segments) {
      msg = new Msg({ meta, segments } as StrictMessage)
    } else {
      fail('The stored record was emtpy')
    }
    await collection.drop()
    await mongo.close()
    await db.close()
    expect(msg.toString()).toBe(hl7)
  })
}

test('store', main, 15000)

afterAll(() => {
  mongo.close()
})
