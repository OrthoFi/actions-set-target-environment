import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    let target = ''

    const environmentName = core.getInput('environment-name')
    if (environmentName) {
      target = environmentName
    } else {
      const branch = core
        .getInput('branch', {required: true})
        .replace('refs/heads/', '')

      switch (branch) {
        case 'main':
          target = 'production'
          break
        case 'risk':
          target = 'risk'
          break
      }
    }

    if (target) {
      core.info(`Setting target environment to ${target}`)
      core.setOutput('target-environment', target)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
