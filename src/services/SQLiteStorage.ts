import { createConnection, getConnection, ConnectionOptions } from 'typeorm'
import { Story } from '../Entities/Story'

const sConfig: ConnectionOptions = {
  type: 'sqlite',
  name: 'default',
  synchronize: true,
  logging: true,
  logger: 'simple-console',
  database: 'database.sqlite',
}

export default function SQLiteStorage(config = sConfig) {

  const dbConnection = createConnection({
    ...config,
    entities: [Story]
  })

  const getItem = (key: string) => {
    return dbConnection
      .then(async connection => {
      const storyRepository = connection.getRepository('Story')

      const story = await storyRepository.findOne(key)

      console.log('getItem', story)

      return story.value
      })
      .catch((err) => console.error(err))
  }

  const setItem = (key: string, item: string) => {
    return dbConnection
      .then(async connection => {
      const storyRepository = connection.getRepository('Story')

      const story = new Story()

      story.key = key
      story.value = item
      // const storyToUpdate =  await storyRepository.findOne(key)
      // console.log('setItem to update', storyToUpdate)
      // storyToUpdate.value = item
      //
      const res = await storyRepository.save(story);

      console.log('setItem', res)
      return res
    })
      .catch((err) => console.error(err))
  }

  const removeItem = (key: string) => {
    return dbConnection
      .then(async connection => {
      const storyRepository = connection.getRepository('Story')

      const storyToRemove = storyRepository.findOne(key)

      const story = await storyRepository.remove(storyToRemove)

      console.log('remoteItem', story)

      return story
    })
      .catch((err) => console.error(err))
  }

  return {
    getItem,
    removeItem,
    setItem,
  }
}
