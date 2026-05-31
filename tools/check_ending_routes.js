#!/usr/bin/env node
// Verifies that special ending branches can fire from their documented gates.
// This is a route-level guard, not a full gameplay simulator.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const ENDINGS_FILE = path.join(ROOT, 'data-endings.js');

const sandbox = { console };
vm.createContext(sandbox);

const source = fs.readFileSync(ENDINGS_FILE, 'utf8');
vm.runInContext(source, sandbox, { filename: 'data-endings.js' });

const chkSpecialEnding = sandbox.chkSpecialEnding;
if (typeof chkSpecialEnding !== 'function') {
  console.error('chkSpecialEnding was not found in data-endings.js');
  process.exit(1);
}

const requiredEndingDefs = ['A', 'B', 'D', 'F', 'G'];
const missingDefs = requiredEndingDefs.filter(id => !sandbox.ENDING_DEFS || !sandbox.ENDING_DEFS[id]);
if (missingDefs.length) {
  console.error(`Missing ENDING_DEFS entries: ${missingDefs.join(', ')}`);
  process.exit(1);
}

function stats(overrides = {}) {
  return Object.assign({ day: 1, c: 50, o: 50, r: 50, t: 50 }, overrides);
}

function trust(overrides = {}) {
  return Object.assign({ haeun: 0, doyun: 0, sejin: 0, jaehyuk: 0 }, overrides);
}

function logs(count, extras = []) {
  const base = Array.from({ length: count }, (_, i) => `LOG-ROUTE-CHECK-${String(i + 1).padStart(2, '0')}`);
  return Array.from(new Set([...base, ...extras]));
}

function runCase(testCase) {
  const actual = chkSpecialEnding(
    testCase.stats,
    testCase.gi,
    testCase.act,
    testCase.trust,
    testCase.logs,
    {},
    null
  );

  return Object.assign({}, testCase, { actual, passed: actual === testCase.expected });
}

const cases = [
  {
    name: 'Act 2 should not trigger special endings',
    expected: null,
    stats: stats({ day: 40, c: 100, o: 100, r: 90 }),
    gi: -40,
    act: 2,
    trust: trust({ haeun: 80, doyun: 80, sejin: 80, jaehyuk: 80 }),
    logs: logs(12, ['LOG-012', 'LOG-OBSERVER-01', 'LOG-OBSERVER-APPROVED']),
  },
  {
    name: 'Act 3 should not trigger special endings',
    expected: null,
    stats: stats({ day: 40, c: 100, o: 100, r: 90 }),
    gi: -40,
    act: 3,
    trust: trust({ haeun: 80, doyun: 80, sejin: 80, jaehyuk: 80 }),
    logs: logs(12, ['LOG-012', 'LOG-OBSERVER-01', 'LOG-OBSERVER-APPROVED']),
  },
  {
    name: 'Ending A canonical route',
    expected: 'A',
    stats: stats({ day: 30, c: 70, o: 60 }),
    gi: 55,
    act: 4,
    trust: trust(),
    logs: [],
  },
  {
    name: 'Ending F guided approved observer route',
    expected: 'F',
    stats: stats({ day: 30 }),
    gi: 5,
    act: 4,
    trust: trust(),
    logs: logs(0, ['LOG-012', 'LOG-OBSERVER-01', 'LOG-OBSERVER-APPROVED']),
  },
  {
    name: 'Ending F approved observer route',
    expected: 'F',
    stats: stats({ day: 31 }),
    gi: 0,
    act: 4,
    trust: trust(),
    logs: logs(0, ['LOG-012', 'LOG-OBSERVER-01', 'LOG-OBSERVER-APPROVED']),
  },
  {
    name: 'Ending F unapproved observer route',
    expected: 'F',
    stats: stats({ day: 33 }),
    gi: -20,
    act: 4,
    trust: trust({ haeun: 65, doyun: 65 }),
    logs: logs(0, ['LOG-012', 'LOG-OBSERVER-01']),
  },
  {
    name: 'Ending F should not trigger without observer log',
    expected: null,
    stats: stats({ day: 33 }),
    gi: -20,
    act: 4,
    trust: trust({ haeun: 65, doyun: 65 }),
    logs: logs(0, ['LOG-012']),
  },
  {
    name: 'Ending D guided quiet freedom route',
    expected: 'D',
    stats: stats({ day: 30 }),
    gi: -30,
    act: 4,
    trust: trust({ haeun: 60, doyun: 60, sejin: 60 }),
    logs: logs(8, ['LOG-RH-QUIET-FREEDOM']),
  },
  {
    name: 'Ending D canonical route',
    expected: 'D',
    stats: stats({ day: 31 }),
    gi: -30,
    act: 4,
    trust: trust({ haeun: 60, doyun: 60, sejin: 60 }),
    logs: logs(8),
  },
  {
    name: 'Ending D fallback route',
    expected: 'D',
    stats: stats({ day: 32, r: 35 }),
    gi: -35,
    act: 4,
    trust: trust({ haeun: 70 }),
    logs: logs(10),
  },
  {
    name: 'Ending B canonical route',
    expected: 'B',
    stats: stats({ day: 30 }),
    gi: -15,
    act: 4,
    trust: trust({ haeun: 65, doyun: 65 }),
    logs: logs(6),
  },
  {
    name: 'Ending B fallback route',
    expected: 'B',
    stats: stats({ day: 31 }),
    gi: -25,
    act: 4,
    trust: trust(),
    logs: logs(10),
  },
  {
    name: 'Ending G canonical route',
    expected: 'G',
    stats: stats({ day: 30 }),
    gi: 0,
    act: 4,
    trust: trust({ haeun: 55 }),
    logs: logs(7),
  },
  {
    name: 'Ending G fallback route',
    expected: 'G',
    stats: stats({ day: 32 }),
    gi: -5,
    act: 4,
    trust: trust({ haeun: 55, doyun: 55 }),
    logs: logs(9),
  },
];

const results = cases.map(runCase);
const failures = results.filter(result => !result.passed);

for (const result of results) {
  const expected = result.expected === null ? 'null' : result.expected;
  const actual = result.actual === null ? 'null' : result.actual;
  const marker = result.passed ? 'OK' : 'FAIL';
  console.log(`${marker} ${result.name}: expected ${expected}, got ${actual}`);
}

if (failures.length) {
  console.error(`Ending route check failed: ${failures.length}/${results.length}`);
  process.exit(1);
}

console.log(`Ending route check passed: ${results.length}/${results.length}`);
