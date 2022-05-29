import { getInput } from '@actions/core'

export function getOptions() {
  return {
    a: getInput('a'),
    b: getInput('b'),
  }
}
