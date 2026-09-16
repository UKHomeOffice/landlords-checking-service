'use strict';

const fs = require('node:fs');

function parseCount(text, label) {
  const match = text.match(new RegExp(String.raw`(\d+)\s+${label}`, 'i'));
  return match ? Number(match[1]) : 0;
}

function buildSummaryFromText(outputText) {
  const commandFailure = outputText.match(/(?:playwright|yarn):\s+not found|command not found/i);
  if (commandFailure) {
    return ['Playwright Nightly Summary', 'Unable to execute Playwright command.', `Error: ${commandFailure[0]}`].join('\n');
  }
  const passed = parseCount(outputText, 'passed');
  const failed = parseCount(outputText, 'failed');
  const flaky = parseCount(outputText, 'flaky');
  const skipped = parseCount(outputText, 'skipped');
  const durationMatch = outputText.match(/\(([^)]+)\)\s*$/m);
  const duration = durationMatch ? durationMatch[1] : 'unknown';
  return ['Playwright Nightly Summary', `Total: ${passed + failed + flaky + skipped}`, `Passed: ${passed}`, `Failed: ${failed}`, `Flaky: ${flaky}`, `Skipped: ${skipped}`, `Duration: ${duration}`].join('\n');
}

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  console.error('Usage: node bin/summarise_playwright_report.js <input-text> <output-txt>');
  process.exit(1);
}

let summary;
try {
  summary = buildSummaryFromText(fs.readFileSync(inputPath, 'utf8'));
} catch (error) {
  summary = `Playwright Nightly Summary\nUnable to parse run output: ${error.message || error}`;
}
fs.writeFileSync(outputPath, `${summary}\n`, 'utf8');
console.log(summary);
