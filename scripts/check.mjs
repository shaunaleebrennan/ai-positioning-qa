import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
for (const file of readdirSync('docs/assets/js').filter(f=>f.endsWith('.js'))) {
  execFileSync(process.execPath,['--check',`docs/assets/js/${file}`],{stdio:'inherit'});
}
execFileSync(process.execPath,['--test'],{stdio:'inherit'});
