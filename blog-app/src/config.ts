import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT

export const DATABASE_URL = process.env.DATABASE_URL

export const NODE_ENV = process.env.NODE_ENV || 'development'

export const SECRET = process.env.SECRET || 'secret'

export default { DATABASE_URL, PORT }
