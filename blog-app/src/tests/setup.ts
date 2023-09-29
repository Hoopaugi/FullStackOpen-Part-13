import db from "../db"

const setup = async () => {
  await db.connect()
}

export default setup
