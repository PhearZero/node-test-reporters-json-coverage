import chalk from 'chalk';
import {Transform} from 'node:stream';

const {cyan, green, magenta} = chalk;
let res = '';

/**
 * Add space
 * @param {number} spacing
 * @return {string}
 */
function space(spacing) {
  return ' '.repeat(spacing);
}

/**
 * Add Colors to Output
 * @param {*} summary
 * @param {number} [spacing]
 * @param {boolean} [isRoot]
 * @return {string}
 */
function colorize(summary, spacing = 0, isRoot = false) {
  switch (typeof summary) {
    case 'number':
      res += cyan(`${summary}`);
      break;
    case 'string':
      res += green(`"${summary}"`);
      break;
    case 'object':
      if (Array.isArray(summary)) { // Array
        res += '[\n';
        summary.forEach((item, index) => {
          // if (typeof item === 'object') {
          res += `${space(spacing + 2)}`;
          colorize(item, spacing + 2, true);
          if (summary.length - 1 !== index) {
            res += ',';
          }
          res += '\n';
          // }
        });
        res += `${space(spacing)}]`;
      } else { // Not Array
        res += `${space(isRoot ? 0 : spacing)}{\n`;
        const keys = Object.keys(summary);
        keys.forEach((key, index) => {
          res += magenta(`${space(spacing + 2)}"${key}": `);
          colorize(summary[key], spacing + 2, true);
          if (keys.length - 1 !== index) {
            res += ',';
          }
          res += '\n';
        });

        res += `${space(spacing)}}`;
      }

      break;
  }
  return res;
}

const jsonCoverageReporter = new Transform({
  writableObjectMode: true,
  transform(event, encoding, callback) {
    switch (event.type) {
      case 'test:coverage': {
        callback(null, `${colorize(event.data.summary)}\n`);
        // callback(null, `${JSON.stringify(event.data.summary)}\n`);
        break;
      }
      default: {
        callback(null);
      }
    }
  },
});

export default jsonCoverageReporter;
