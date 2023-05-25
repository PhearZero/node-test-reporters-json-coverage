import {Transform} from 'node:stream';
const jsonCoverageReporter = new Transform({
  writableObjectMode: true,
  transform(event, encoding, callback) {
    switch (event.type) {
      case 'test:coverage': {
        callback(null, `${JSON.stringify(event.data.summary, null, 2)}\n`);
        break;
      }
      default: {
        callback(null);
      }
    }
  },
});

export default jsonCoverageReporter;
