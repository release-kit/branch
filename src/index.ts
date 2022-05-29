import { setOutput } from '@actions/core'
import { getOptions } from './options'

async function run() {
  const { a, b } = getOptions()
  const sum = Number(a) + Number(b)
  setOutput('result', sum)
}

run()
