const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 Starting project cleanup...');

// Remove build artifacts
['.next', 'node_modules', 'dist'].forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`✔ Removed ${dir} directory`);
  }
});

// Remove temporary markdown files
fs.readdirSync('.')
  .filter(file => file.endsWith('.md') && file !== 'README.md')
  .forEach(file => {
    fs.rmSync(file);
    console.log(`✔ Removed temporary file: ${file}`);
  });

// Clean npm cache and reinstall
try {
  execSync('npm cache clean --force');
  execSync('npm install');
  console.log('✔ Dependencies reinstalled successfully');
} catch (error) {
  console.error('⚠ Error during dependency reinstallation:', error.message);
}

console.log('✅ Cleanup completed successfully');