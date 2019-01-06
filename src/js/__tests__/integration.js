import { execSync } from 'child_process';

describe('# integration test', () => {
    beforeEach(() => {
        execSync('rm -rf testoutput');
    });

    it('## should print help options', () => {
        const output = execSync('./scripts/sgen-pom.sh -h').toString();
        expect(output).toMatchSnapshot();
    });

    it('## should generate design', () => {
        const output = execSync('./scripts/sgen-pom.sh -d src/test/fixture/design.js -o testoutput').toString();
        expect(output).toMatchSnapshot();
    });

    it('## should generate design with merge', () => {
        let output = execSync(
            './scripts/sgen-pom.sh -d src/test/fixture/design.js -o testoutput --overwrite=merge'
        ).toString();
        expect(output).toMatchSnapshot();
        output = execSync(
            './scripts/sgen-pom.sh -d src/test/fixture/design.js -o testoutput --overwrite=merge'
        ).toString();
        expect(output).toMatchSnapshot();
    });

    it('## should generate design and run pom commands', () => {
        let output = execSync(
            './scripts/sgen-pom.sh -d src/test/fixture/design.js -o testoutput --overwrite=merge'
        ).toString();
        expect(output).toMatchSnapshot();
        output = execSync('/usr/local/bin/mvn package', { cwd: 'testoutput' }).toString();
    });
});
