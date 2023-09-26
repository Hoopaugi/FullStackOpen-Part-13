import usersServices from "../api/users/users.services"
import { comparePassword, createToken } from "../utils"
import { SECRET } from "../config"
import { IAuthPayload, ICredentials } from "./auth.types"

const login = async (credentials: ICredentials): Promise<IAuthPayload> => {
  const { username, password } = credentials

  const user = await usersServices.getByUsername(username, true)

  if (!user) {
    throw new Error('Invalid username or password')
  }

  const passwordCorrect = await comparePassword(password, user.passwordHash)

  if (!passwordCorrect) {
    throw new Error('Invalid username or password')
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = createToken(userForToken, SECRET)

  const payload = {
    username: user.username,
    name: user.name,
    token
  }

  return payload
}

export default { login }
