import { message, dryrun, result, createDataItemSigner } from '@permaweb/aoconnect'

const PROCESS = "0tbh3ICdztK5hn2HOL7hDrloH7YMZZtPBjEzFUTvQXs"

function read(action, options = {}) {
  return dryrun({
    process: PROCESS,
    data: "",
    tags: [
      { name: 'Data-Protocol', value: 'ao' },
      { name: 'Variant', value: 'ao.TN.1'},
      { name: 'Type', value: 'Message'},
      { name: 'Action', value: action }
    ],
    ...options
  }).then(res => res.Output.data)
}

function write(data, action) {
  return message({
    process: PROCESS,
    signer: createDataItemSigner(arweaveWallet),
    data: data,
    tags: [
       { name: 'Data-Protocol', value: 'ao' },
       { name: 'Variant', value: 'ao.TN.1'},
       { name: 'Type', value: 'Message'},
       { name: 'Action', value: action }
     ]
  }).then(id => result({
    process: PROCESS,
    message: id
  })).then(res => res.Output.data)
}


export function list(user) {
  return read("List", { Owner: user })
}

export function add(description) {
  return write(description, "Add-Item") 
}

export function complete(id) {
  return write(String(id), "Complete")
}

export function remove(id) {
  return write(String(id), "Remove")
}

