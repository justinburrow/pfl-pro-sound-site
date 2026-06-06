import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'z3u9veqi',
    dataset: 'production',
  },
  server: {
    hostname: 'localhost',
    port: 3333,
  },
})