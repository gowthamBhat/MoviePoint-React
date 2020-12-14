// import Raven from 'raven-js';

function init() {
    // Raven.config("https://d5cc7a7cfa4247e0a4760e6b8356f650@o490765.ingest.sentry.io/5555249").install();
}
function logger(error) {
    // Raven.captureException(error)
    console.log(error)
}
export {
    init,
    logger
}