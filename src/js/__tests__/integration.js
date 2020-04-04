import { execSync } from 'child_process';

describe('# integration test', () => {
    beforeEach(() => {
        execSync('rm -rf testoutput');
    });

    it('## should generate design and run pom commands', () => {
        let output = execSync('npm run build').toString();
        output = execSync('sgen -g `pwd`/dist/pom.min.js -d src/test/fixture/design.json -o testoutput').toString();
        output = output.replace(/info: Loaded generator .*pom.min.js.*/, '');
        output = output
            .replace(/warn: Please cherrypick changes from master-sgen-generated from .*/, '')
            .replace(/info: git cherry-pick .*/, '');
        expect(output).toMatchSnapshot();
        execSync('mvn compile',  { cwd: 'testoutput', stdio: 'inherit' });
    });
});
