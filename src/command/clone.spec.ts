import * as temp from 'temp';
import { expect } from 'chai';
import { clone } from './clone';
import { getStatus } from './status';

const track = temp.track();

describe('clone', async () => {

    after(async () => {
        track.cleanupSync();
    });

    it('missing', async () => {
        try {
            await clone('missing/url/to/git', track.mkdirSync());
            throw new Error('Expected error when cloning a non-existing repository repository.');
        } catch (error) {
            expect(error.message.trim()).to.be.equal(`fatal: repository 'missing/url/to/git' does not exist`);
        }
    });

    it('public https', async () => {
        const repositoryPath = track.mkdirSync();
        await clone('https://github.com/TypeFox/dugite-extra.git', repositoryPath);
        const status = await getStatus(repositoryPath);

        expect(status.workingDirectory.files).to.be.empty;
    });

});

