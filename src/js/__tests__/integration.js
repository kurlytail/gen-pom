import { execSync } from 'child_process';

describe('# integration test', () => {
    beforeEach(() => {
        execSync('rm -rf testoutput');
    });

    it('## should print help options', () => {
        let output = execSync('npm run build').toString();
        output = execSync('sgen -g `pwd`/dist/pom.min.js -h').toString();
        expect(output).toMatchSnapshot();
    });

    it('## should generate design and run pom commands', () => {
        let output = execSync('npm run build').toString();
        output = execSync('sgen -g `pwd`/dist/pom.min.js -d src/test/fixture/design.json -o testoutput').toString();
        output = output.replace(/info: Loaded generator .*pom.min.js.*/, '');
        expect(output).toMatchSnapshot();
        output = execSync('npm install', { cwd: 'testoutput' }).toString();
        output = execSync('npm run lint', { cwd: 'testoutput' }).toString();
        output = execSync('mvn compile', { cwd: 'testoutput' }).toString();
    });

    it('## should generate design and run pom commands with reactor extensions', () => {
        let output = execSync(
            'sgen -g `pwd`/dist/pom.min.js -e templates/addons/reactor -d src/test/fixture/design.json -o testoutput'
        ).toString();
        expect(output).toMatchSnapshot();
        output = execSync('npm install', { cwd: 'testoutput' }).toString();
        output = execSync('npm run lint', { cwd: 'testoutput' }).toString();
        output = execSync('mvn compile', { cwd: 'testoutput' }).toString();
    });
});
