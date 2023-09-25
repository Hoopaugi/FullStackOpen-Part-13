import { isString } from "../../utils"
import { IUserCreationAttributes } from "./users.types"

export const toNewUser = (object: unknown): IUserCreationAttributes => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('username' in object && 'name' in object) {
    const newUser: IUserCreationAttributes = {
      username: parseUsername(object.username),
      name: parseName(object.name)
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

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Invalid or missing name')
  }

  return name
}
