/*
 * Listens for new image files and uploads them to s3
 */

// let AWS = require('aws-sdk')
let chokidar = require('chokidar')

let log = console.log.bind(console)

const SANTA_CODE = process.env.SANTA_CODE

const regexPattern = /\.(gif|jpg|jpeg|tiff|png)$/i

const incoming = `${__dirname}/photos/incoming`

// Initialize watcher.
var watcher = chokidar.watch(
  incoming, { ignored: /(^|[/\\])\../, persistent: true }
)

// Add event listeners.
watcher
  .on('add', path => (
    log(`${path.match(regexPattern)[0]}`)
  ))
//  .on('change', path => log(`File ${path} has been changed`))
//  .on('unlink', path => log(`File ${path} has been removed`));

// More possible events.
// watcher
//   .on('addDir', path => log(`Directory ${path} has been added`))
//   .on('unlinkDir', path => log(`Directory ${path} has been removed`))
//   .on('error', error => log(`Watcher error: ${error}`))
//   .on('ready', () => log('Initial scan complete. Ready for changes'))
//   .on('raw', (event, path, details) => {
//     log('Raw event info:', event, path, details);
//   });

let AWS = require('aws-sdk')


AWS.config.update({region: 'us-east-1'})
const s3 = new AWS.S3({apiVersion: '2006-03-01'})
const uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
const file = process.argv[3];

// Call S3 to list current buckets
s3.listBuckets(function(err, data) {
   if (err) {
      console.log("Error", err);
   } else {
      console.log("Bucket List", data.Buckets);
   }
})
