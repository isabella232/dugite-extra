/**
 * Remove the remote prefix from the string. If there is no prefix, returns
 * `undefined`. E.g.:
 *
 *  origin/my-branch       -> my-branch
 *  origin/thing/my-branch -> thing/my-branch
 *  my-branch              -> null
 */
export function removeRemotePrefix(name: string): string | undefined {
    const pieces = name.match(/.*?\/(.*)/)
    if (!pieces || pieces.length < 2) {
        return undefined;
    }
    return pieces[1];
}