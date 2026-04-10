// Run this with: node deploy-studio.js
const { spawn } = require('child_process');
const path = require('path');

const child = spawn('npm', ['run', 'sanity:deploy'], { stdio: ['pipe', 'inherit', 'inherit'], shell: true });

let step = 0;

// Wait a bit then start sending input
setTimeout(() => {
  // Step 1: Press down arrow to select "Create new studio hostname"
  child.stdin.write('\x1B[B'); // down arrow
  setTimeout(() => {
    // Step 2: Press Enter to confirm
    child.stdin.write('\n');
    setTimeout(() => {
      // Step 3: Type the hostname and press Enter
      child.stdin.write('theuaecareer\n');
    }, 1000);
  }, 500);
}, 3000);

child.on('close', (code) => {
  console.log(`\nDeploy exited with code ${code}`);
  if (code === 0) {
    console.log('\n✅ Studio deployed! Visit: https://theuaecareer.sanity.studio');
  }
});
