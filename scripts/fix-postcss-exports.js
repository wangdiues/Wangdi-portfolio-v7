const fs = require('fs');
const path = require('path');

const packageJsonPaths = [
  path.join(process.cwd(), 'node_modules', 'gatsby', 'node_modules', 'postcss', 'package.json'),
  path.join(process.cwd(), 'node_modules', 'postcss', 'package.json'),
];

const patchExports = packageJsonPath => {
  if (!fs.existsSync(packageJsonPath)) {
    return;
  }

  const raw = fs.readFileSync(packageJsonPath, 'utf8');
  const json = JSON.parse(raw);
  const exportsField = json.exports;

  if (!exportsField || typeof exportsField !== 'object') {
    return;
  }

  if (exportsField['./package.json']) {
    return;
  }

  json.exports = {
    ...exportsField,
    './package.json': './package.json',
  };

  fs.writeFileSync(packageJsonPath, `${JSON.stringify(json, null, 2)}\n`);
  process.stdout.write(
    `Patched exports in ${path.relative(process.cwd(), packageJsonPath)}${require('os').EOL}`,
  );
};

packageJsonPaths.forEach(patchExports);
