import {ConnectionOptions, createConnection } from 'typeorm'
import { Story } from '../Entities/Story'

export interface SQLiteStorageConfig {
  database: string;
  logging?: boolean;
  logger?: ConnectionOptions["logger"];
}


export default function SQLiteStorage(config?: SQLiteStorageConfig) {

  const storageEntity = Story

  const dbConnection = createConnection({
    database: 'temp/sqliteStorage.db',
    type: 'sqlite',
    synchronize: true,
    logging: false,
    ...config,
    entities: [ storageEntity ],
  })

  const getItem = (key: string) => {
    return dbConnection
      .then(async connection => {
        const storyRepository = connection.getRepository(storageEntity.name)

        const story: any = await connection.getRepository(storageEntity.name).findOne(key)

        return story && story.value
      })
      .catch((err) => console.error(err))
  }

  const setItem = (key: string, item: string) => {
    return dbConnection
      .then(async connection => {
        const storyRepository = connection.getRepository(storageEntity.name)

        const story = new Story()

        story.key = key
        story.value = item

        return storyRepository.save(story)
    })
      .catch((err) => console.error(err))
  }

  const removeItem = (key: string) => {
    return dbConnection
      .then(async connection => {
        const storyRepository = connection.getRepository(storageEntity.name)

        const storyToRemove = await storyRepository.findOne(key)

        return storyRepository.remove(storyToRemove)
    })
      .catch((err) => console.error(err))
  }

  const getAllKeys = () => {
    return dbConnection
      .then(async connection => {
        const storyRepository = connection.getRepository(storageEntity.name)

        const stories = await storyRepository.find()

        return stories.map((story: Story) => story.key)

      })
      .catch((err) => console.error(err))
  }

  const clear = () => {
    return dbConnection
      .then(async connection => {
        const storyRepository = connection.getRepository(storageEntity.name)

        const storageEntityMetadata = connection.getMetadata(storageEntity)

        return storyRepository.query(`DELETE FROM \`${storageEntityMetadata.tableName}\`;`);
      })
      .catch((err) => console.error(err))
  }



  return {
    getItem,
    removeItem,
    setItem,
    clear,
    getAllKeys,
  }
}
