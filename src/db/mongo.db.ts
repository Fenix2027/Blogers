import { Collection, MongoClient, Db } from 'mongodb';
import { Blog } from '../blogs/domain/blog';
import { Post } from '../posts/domain/post';
import { SETTINGS } from '../core/settings/settings';
import { IUserDB } from '../users/types/user.db.interface';

// 1. Экспортируем пустые переменные, которые импортируют ваши репозитории
export let client: MongoClient;
export let dbInstance: Db; // Переименовал, чтобы не путать с объектом
export let blogsCollection: Collection<Blog>;
export let postCollection: Collection<Post>;
export let usersCollection: Collection<IUserDB>;

// 2. Объект для управления (для bootstrap и тестов)
export const db = {
  async run(url: string) {
    try {
      client = new MongoClient(url);
      await client.connect();

      // Инициализируем БД
      dbInstance = client.db(SETTINGS.DB_NAME);

      // 3. ЗАПОЛНЯЕМ экспортированные переменные коллекциями
      blogsCollection = dbInstance.collection<Blog>('blogs');
      postCollection = dbInstance.collection<Post>('posts');
      usersCollection = dbInstance.collection<IUserDB>('users');

      await dbInstance.command({ ping: 1 });
      console.log('✅ Connected successfully to mongo server');
    } catch (e: unknown) {
      console.error("❌ Can't connect to mongo server", e);
      await client.close();
    }
  },

  async stop() {
    await client.close();
    console.log('Connection closed');
  },

  async drop() {
    // Используем dbInstance, который уже инициализирован в run()
    const collections = await dbInstance.listCollections().toArray();
    for (const collection of collections) {
      await dbInstance.collection(collection.name).deleteMany({});
    }
  }
};

// Чтобы работал старый код, где импортировали runDB
export const runDB = db.run;
