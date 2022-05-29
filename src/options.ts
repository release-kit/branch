import { getInput } from '@actions/core'

export function getOptions() {
  return {
    branch: getInput('branch'),
    action: getInput('action'),
  }
}
