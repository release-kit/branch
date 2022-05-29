import { info } from '@actions/core'
import { getOptions } from './options'

async function run() {
  const { branch, action } = getOptions()
  info(`Branch: ${branch}`)
  info(`Action: ${action}`)
}

run()
