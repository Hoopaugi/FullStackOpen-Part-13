import { isString } from "../../utils"

export const parseId = (object: unknown): string => {
  if (!object) {
    throw new Error('Missing id')
  }

  if (!isString(object)) {
    throw new Error(`Invalid id ${object}`)
  }

  return object
}
