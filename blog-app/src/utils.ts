export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

export const isNumber = (num: unknown): num is number => {
  return typeof num ==='number'
}

export const parseId = (object: unknown): string => {
  if (!object) {
    throw new Error('Missing id')
  }

  if (!isString(object)) {
    throw new Error(`Invalid id ${object}`)
  }

  return object
}
