import { Collection, Db, MongoClient } from 'mongodb';
import { Blogs } from '../blogs/types/blogs';
import { Post } from '../posts/types/post';
import { SETTINGS } from '../core/settings/settings';

const BLOGS_COLLECTION_NAME = 'blogs';
const POST_COLLECTION_NAME = 'posts';

export let client: MongoClient;
export let driverCollection: Collection<Blogs>;
export let rideCollection: Collection<Post>;

// Подключения к бд
export async function runDB(url: string): Promise<void> {
  client = new MongoClient(url);
  const db: Db = client.db(SETTINGS.DB_NAME);

  // Инициализация коллекций
  driverCollection = db.collection<Blogs>(BLOGS_COLLECTION_NAME);
  rideCollection = db.collection<Post>(POST_COLLECTION_NAME);

  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('✅ Connected to the database');
  } catch (e) {
    await client.close();
    throw new Error(`❌ Database not connected: ${e}`);
  }
}

// для тестов
export async function stopDb() {
  if (!client) {
    throw new Error(`❌ No active client`);
  }
  await client.close();
}
