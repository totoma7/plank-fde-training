# Pull request loop

Every change ships through this loop, one pull request per change.

1. `git switch -c feature/<name>` from an up-to-date `main`.
2. Make the change and commit it.
3. Start the Codex review of the branch in the background
   (`/codex:review --base main --background`), then run `pnpm check` while
   it works. If either finds a problem, fix it and amend the commit before
   pushing.
4. Push and open the pull request with `gh pr create --fill`.
5. Wait for CI, the Vercel preview, and the review if it is still running.
6. Open the preview deployment and check the changed page at desktop and
   phone widths.
7. Merge with `gh pr merge --merge`, then add the branch-to-merge time to
   the pull request description.

## Why the review starts before the pull request

Measured on PRs #4 to #8 (404 page, favicon, robots.txt, metadata, footer),
in seconds. The review then ran after the pull request was open.

| Step                                 | #4  | #5  | #6  | #7  | #8  | Avg |
| ------------------------------------ | --- | --- | --- | --- | --- | --- |
| Implement and `pnpm check`           | 11¹ | 55  | 33  | 44  | 47  | 38  |
| Commit, push, open PR                | 12  | 9   | 10  | 4   | 4   | 8   |
| Codex review                         | 35  | 59  | 35  | 45  | 45  | 44  |
| Wait for CI and preview after review | 5   | 1   | 4   | 6   | 5   | 4   |
| Preview check (human)                | 76  | 22  | 30  | 21  | 29  | 36  |
| Merge                                | 2   | 3   | 2   | 5   | 3   | 3   |
| **Branch to merge**                  | 141 | 149 | 114 | 125 | 133 | 132 |

¹ #4 was designed before its branch was created, so this undercounts.

The slowest step was the Codex review, at 44 s on average. Nothing else
needed that long: after the push, CI finished in 29 s on average and the
Vercel preview in 15 s. Because the review only started once the pull
request was open, the preview check waited on it every time.

The one change: start the review as soon as the change is committed and
let it run alongside `pnpm check`, the push, and CI, instead of after the
pull request is open. CI should become the last thing to finish before the
preview check.
