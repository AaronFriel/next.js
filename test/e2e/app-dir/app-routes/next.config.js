const path = require('node:path')

/**
 * @type {import('next').NextConfig}
 */
const config = {}

if (process.env.BASE_PATH) {
  config.basePath = process.env.BASE_PATH
}

config.output.devtoolModuleFilenameTemplate = (context) => {
  let { absoluteResourcePath } = context
  if (path.isAbsolute(absoluteResourcePath)) {
    return `webpack:///${absoluteResourcePath}`
  } else {
    return `webpack://${context.namespace}/${context.resourcePath}`
  }
}

module.exports = config
