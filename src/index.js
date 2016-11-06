'use strict'

import fsp from 'fs-promise'
import getAppDir from 'get-app-dir'
import errorLogExit from 'error-log-exit'
import 'colors'

export default setGitDescription()

function setGitDescription () {
  const pkgFile = `${getAppDir}/package.json`
  const gitFile = `${getAppDir}/.git/description`

  fsp.readJSON(pkgFile).then((pkg) => {
    if (!pkg.description) errorLogExit(`no description in file ${pkgFile}`)

    fsp.access(gitFile, fsp.constants.W_OK)
      .then(() => {
        fsp.writeFile(gitFile, pkg.description)
          .then(() => console.log('successfull written git description ...'.bold.green))
          .catch(() => errorLogExit(`error can't write to ${gitFile}`))
      })
      .catch(() => errorLogExit(`file doesn't exist: ${gitFile}`))
  })
}
