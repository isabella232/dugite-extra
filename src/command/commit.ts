import { git, GitError, IGitExecutionOptions } from '../core/git'

export async function createCommit(repositoryPath: string, message: string, signOff: boolean = false, amend: boolean = false, options?: IGitExecutionOptions): Promise<void> {
    try {
        const args = ['commit', '-F', '-'];
        if (signOff) {
            args.push('-s');
        }
        if (amend) {
            args.push('--amend');
        }
        let opts = {};
        if (options) {
            opts = {
                ...options
            }
        }
        opts = {
            ...opts,
            stdin: message
        }
        await git(args, repositoryPath, 'createCommit', opts);
    } catch (e) {
        // Commit failures could come from a pre-commit hook rejection. So display
        // a bit more context than we otherwise would.
        if (e instanceof GitError) {
            const output = e.result.stderr.trim();
            let standardError = '';
            if (output.length > 0) {
                standardError = `, with output: '${output}'`;
            }
            const exitCode = e.result.exitCode;
            const error = new Error(`Commit failed - exit code ${exitCode} received${standardError}`);
            error.name = 'commit-failed';
            throw error;
        } else {
            throw e;
        }
    }
}
