#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    log(`Running: ${command} ${args.join(' ')}`, 'cyan');
    
    const child = spawn(command, args, {
      stdio: 'inherit',
      ...options
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function runTests() {
  const startTime = Date.now();
  
  log('🚀 Starting Test Suite', 'bright');
  log('==========================================', 'blue');

  try {
    // Check if node_modules exists and install if needed
    const fs = require('fs');
    if (!fs.existsSync('node_modules')) {
      log('📦 Installing dependencies...', 'yellow');
      await runCommand('npm', ['install']);
    }

    // Run different test suites
    const testSuites = [
      {
        name: 'Component Tests',
        command: 'npm',
        args: ['test', '--', '--testPathPattern=components', '--passWithNoTests']
      },
      {
        name: 'Store Tests',
        command: 'npm',
        args: ['test', '--', '--testPathPattern=store', '--passWithNoTests']
      },
      {
        name: 'API Tests',
        command: 'npm',
        args: ['test', '--', '--testPathPattern=api', '--passWithNoTests']
      }
    ];

    for (const suite of testSuites) {
      log(`\n🧪 Running ${suite.name}...`, 'magenta');
      log('------------------------------------------', 'blue');
      
      try {
        await runCommand(suite.command, suite.args);
        log(`✅ ${suite.name} passed!`, 'green');
      } catch (error) {
        log(`❌ ${suite.name} failed!`, 'red');
        throw error;
      }
    }

    // Run full test suite with coverage
    log('\n📊 Generating Coverage Report...', 'magenta');
    log('------------------------------------------', 'blue');
    await runCommand('npm', ['run', 'test:coverage', '--', '--passWithNoTests']);

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    log('\n🎉 All tests completed successfully!', 'green');
    log(`⏱️  Total time: ${duration}s`, 'cyan');
    log('==========================================', 'blue');

  } catch (error) {
    log('\n💥 Test suite failed!', 'red');
    log(`Error: ${error.message}`, 'red');
    log('==========================================', 'blue');
    process.exit(1);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  log('Test Runner Usage:', 'bright');
  log('  node scripts/test-runner.js          Run all tests', 'cyan');
  log('  node scripts/test-runner.js --watch  Run tests in watch mode', 'cyan');
  log('  node scripts/test-runner.js --help   Show this help', 'cyan');
  process.exit(0);
}

if (args.includes('--watch')) {
  log('👀 Starting tests in watch mode...', 'yellow');
  runCommand('npm', ['run', 'test:watch'])
    .catch((error) => {
      log(`Error: ${error.message}`, 'red');
      process.exit(1);
    });
} else {
  runTests();
}