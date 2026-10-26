# Behavior library

Each directory groups one working Behavior or a small set of cooperating Behaviors.

| Project | Files | State |
| --- | --- | --- |
| [single-assembler-mall](single-assembler-mall/) | `storage.bsf` (assembler to follow) | Experimental; untested in game |

Conventions:
- Keep editable logic in `.bsf`, not JavaScript or raw clipboard strings.
- Add a README per project: purpose, required components, parameters/register wiring, limits, in-game test steps.
- Keep `build/` as generated output; do not commit it.
- Export and decompile any Behavior that behaves unexpectedly so we can compare actual game logic with source.
- Never label a Behavior "working" based only on a successful compilation.

Run `uv run python scripts/bsf.py lint` and `uv run python scripts/bsf.py build` at the repository root.
