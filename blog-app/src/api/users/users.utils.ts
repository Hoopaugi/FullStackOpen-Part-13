import { isString } from "../../utils"
import { IUserCreationAttributes } from "./users.types"
import { hashPassword } from "./users.auth";

export const toNewUser = async (object: unknown): Promise<IUserCreationAttributes> => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('username' in object && 'name' in object && 'password' in object) {
    const newUser: IUserCreationAttributes = {
      username: parseUsername(object.username),
      name: parseName(object.name),
      passwordHash: await parsePassword(object.password)
    }

    return newUser
  }

  throw new Error('Invalid or missing fields')
}

export const parseUsername = (username: unknown): string => {
  if (!username || !isString(username)) {
    throw new Error('Invalid or missing username')
  }

  return username
}

export const parsePassword = async (password: unknown): Promise<string> => {
  if (!password || !isString(password)) {
    throw new Error('Invalid or missing password')
  }

  const passwordHash = await hashPassword(password)

  return passwordHash
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Invalid or missing name')
  }

  return name
}
