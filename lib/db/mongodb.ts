import { MongoClient, Db } from 'mongodb'
import { config } from '@/lib/config'

let client: MongoClient | null = null
let db: Db | null = null

export async function connectToDatabase() {
  if (db) {
    return { client: client!, db }
  }

  try {
    client = new MongoClient(config.mongodb.uri)
    await client.connect()
    db = client.db(config.mongodb.dbName)

    console.log('Connected to MongoDB')
    return { client, db }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

export async function getDatabase(): Promise<Db> {
  if (!db) {
    const { db: database } = await connectToDatabase()
    return database
  }
  return db
}

export async function closeConnection() {
  if (client) {
    await client.close()
    client = null
    db = null
  }
}
