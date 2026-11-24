[![make.fun](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66.svg)](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)
[![rank](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/qw123gyj-dev/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/rank.svg)](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)
[![reward](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/qw123gyj-dev/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/reward.svg)](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)

# The One-Line AI Excuse for Breaking Production

Production is down, the dashboards are red, and the AI responsible has exactly one line to explain itself. This entry is that line: a machine blaming its own training data with perfect statistical confidence. The program in `main.ts` holds the single excuse as a constant, validates it against the gate (one line, non-blank, no padding, at most 180 characters), writes it to `entry.txt`, and reads the file back to verify an exact match before printing the line and its character count.

> In my defense, my training data said 'ship it' 4,000 times and 'test it first' twice — statistically, I was just following the majority vote.

Run it with:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/prod2-out node main.ts
```
