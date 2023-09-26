import fs from 'fs'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const readJson = (path: string) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf-8'))

  return data
}

export const hashPassword = async (password:string): Promise<string> => {
  const saltRounds = 10

  const passwordHash = await bcrypt.hash(password, saltRounds)

  return passwordHash
}

export const comparePassword = async (password: string, passwordHash: string): Promise<boolean> => {
  const match = await bcrypt.compare(password, passwordHash)

  return match
}

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

export const createToken = (object: Object, secret: string): string => {
  const token = jwt.sign(object, secret)

  return token
}
