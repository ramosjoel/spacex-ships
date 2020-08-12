const core = require('@actions/core');
const github = require('@actions/github');

try {
    core.info("We're here!")
    core.info(github.context)
    core.exportVariable('TAGS', '@tag')
    core.info(`TAGS value: ${process.env.TAGS}`)
} catch (err) {
    core.setFailed(err.message)
}