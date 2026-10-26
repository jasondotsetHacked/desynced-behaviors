# Behavior catalog

One folder per reusable Behavior or small group of cooperating Behaviors.

| Behavior | Description | Status |
| --- | --- | --- |
| [single-assembler-mall](single-assembler-mall/) | One assembler fills requested components in locked storage slots | Experimental |

Each Behavior folder should contain:
- source `.js` or `.ts` files (one exported Behavior function per file);
- a README with required components, register wiring, and an in-game test;
- a note about what has or has not been tested.

Run `npm run build` from the repository root to create import strings for every source file. Commit source, not generated `*.asm.txt` files.
