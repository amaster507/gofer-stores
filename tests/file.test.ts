import Msg from 'ts-hl7'
import fs from 'fs'
import stores from '../src'

const hl7 = fs.readFileSync('./sample.hl7', 'utf8')

const msg = new Msg(hl7)

test('store', async () => {
  const fileStore = new stores.file()
  if (fs.existsSync('./local/MSGID002.hl7')) fs.rmSync('./local/MSGID002.hl7')
  if (!fs.existsSync('./local')) fs.mkdirSync('./local')
  return fileStore.store(msg).then(() => {
    const storedFile = fs.readFileSync('./local/MSGID002.hl7', 'utf8')
    if (fs.existsSync('./local/MSGID002.hl7')) fs.rmSync('./local/MSGID002.hl7')
    expect(storedFile).toBe(hl7)
  })
})
