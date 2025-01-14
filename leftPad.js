
// 1. Install Benchmark.js by running: npm install benchmark
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

// 2. Define each implementation:

// (A) Original Implementation (Loop-Based)
function leftPadOriginal(str, len, ch) {
  str = String(str);
  var i = -1;
  if (!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
}

// (B) Built-in padStart (ES2017+)
function leftPadPadStart(str, len, ch = ' ') {
  return String(str).padStart(len, ch);
}

// (C) Using repeat (ES6+)
function leftPadRepeat(str, len, ch = ' ') {
  str = String(str);
  const needed = len - str.length;
  if (needed <= 0) return str;
  return ch.repeat(needed) + str;
}

// (D) Using Array + join
function leftPadArrayJoin(str, len, ch = ' ') {
  str = String(str);
  const needed = len - str.length;
  if (needed <= 0) return str;
  return new Array(needed + 1).join(ch) + str;
}

// 3. Add test cases to the suite
suite
  .add('original-loop', function() {
    leftPadOriginal('test', 10, '_');
  })
  .add('padStart', function() {
    leftPadPadStart('test', 10, '_');
  })
  .add('repeat', function() {
    leftPadRepeat('test', 10, '_');
  })
  .add('arrayJoin', function() {
    leftPadArrayJoin('test', 10, '_');
  })
  // 4. Listen to events
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  // 5. Run async
  .run({ async: true });
