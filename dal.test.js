import { test } from 'node:test'
import fs from 'node:fs'
import { add, list, complete, remove } from './dal.js'
import Arweave from 'arweave'

const arweave = Arweave.init({})

const jwk = JSON.parse(fs.readFileSync('./test.json', 'utf-8'))

globalThis.arweaveWallet = jwk

test('test todos', async () => {
  await add("Todo 1")
  await add("Todo 2")
  const user = await arweave.wallets.jwkToAddress(jwk)
  const results = JSON.parse(await list(user))
  console.log(results)
  console.log('Added Todos')
  await complete(results[0].Id)
  await complete(results[1].Id)
  console.log(JSON.parse(await list(user)))
  console.log('Marked Complete')
  await remove(results[0].Id)
  await remove(results[1].Id)
  console.log(JSON.parse(await list(user)))
  console.log('Removed Todos')
})
