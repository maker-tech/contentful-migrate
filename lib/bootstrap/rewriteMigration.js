const log = require('migrate/lib/log')

const { createStoreFactory } = require('../store')

const rewriteMigration = async (spaceId, environmentId, accessToken, files) => {
  const factory = await createStoreFactory({
    accessToken,
    environmentId,
    spaceId
  })

  for (const file of files) {
    const contentType = file.contentTypeId
    const set = {
      lastRun: file.fileName,
      migrations: [
        {
          title: file.fileName,
          timestamp: Date.now(),
          description: `Create content model for ${contentType}`
        }
      ]
    }
    const store = factory.newStore(contentType)
    await store.writeState(set)
    log('Wrote contentful migration state', contentType)
  }
}

module.exports = rewriteMigration
