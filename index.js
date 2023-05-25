import {Transform} from 'node:stream';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const pkg = require(`${process.cwd()}/package.json`);

const jsonCoverageReporter = new Transform({
  writableObjectMode: true,
  transform(event, encoding, callback) {
    switch (event.type) {
      case 'test:coverage': {
        let error = null;
        const thresholds = pkg?.test?.coverage?.thresholds;
        if (thresholds !== 'undefined') {
          const {
            coveredBranchPercent,
            coveredLinePercent,
            coveredFunctionPercent,
          } = event.data.summary.totals;
          if (
            (thresholds?.line || 0 ) > coveredLinePercent ||
            (thresholds?.branch || 0 ) > coveredBranchPercent ||
            (thresholds?.function || 0 ) > coveredFunctionPercent
          ) {
            error = new Error('Under Line');
          }
        }
        callback(error, `${JSON.stringify(event.data.summary, null, 2)}\n`);
        break;
      }
      default: {
        callback(null);
      }
    }
  },
});

export default jsonCoverageReporter;
