# Single Assembler Mall (experimental)

A tiny two-Behavior mall: one storage advertises the first empty locked component slot, and one nearby assembler produces the requested component.

## In-game setup

1. Build a **storage** with a Behavior Controller and a few free inventory slots.
2. Build an **assembler** with an Assembler component and a Behavior Controller.
3. Put both on your logistics network. Supply production ingredients and have a way to move finished items (for example, logistics bots).
4. In the storage, lock/fix **one empty slot per component** you want. Start with two different non-stackable components that the assembler can craft.
5. Import `storage-missing.js.asm.txt` into the **storage** Behavior Controller. Link its `request` parameter (P1) to the storage's **Signal** register.
6. Import `assembler-mall.js.asm.txt` into the **assembler** Behavior Controller. Set `storage` (P1) to the **storage building entity**. Link `production` (P2) to the Assembler component's **recipe/production input register**, not its missing-material display.

Build from repository root:

```bash
npm install
npm run build
```

Copy each generated `*.js.asm.txt` file as a complete string into the corresponding in-game Behavior import window.

## Expected operation

- The storage advertises the item type in its first empty locked slot.
- The assembler reads that signal and checks if it can produce the item.
- It sets its production register to request one, then waits until it holds the output.
- It clears the recipe, orders transfer to storage, and waits until the item leaves.
- When all storage slots are filled, the assembler stops requesting more items.

## First in-game test

- Check that an empty fixed storage slot makes the storage's Signal show the right item.
- Check that the assembler's recipe register changes to that component.
- Confirm the component is produced and transferred to storage.
- Take it out of storage; confirm the assembler makes another.
- Fill all locked slots; confirm production stops.

## Limits

- **Not yet compiled or tested in Desynced 1.0.** The JS uses names found in [desynced-tools](https://github.com/ribrdb/desynced-tools) instruction metadata, but its definitions may be older than the game. Compilation or in-game behavior may need fixes.
- The first missing locked slot wins. If its item is unsupported by the assembler, this simple version cannot skip it to make another item.
- This is *one item per empty locked slot*, not a stock-level manager; do not start with stackable supplies.
- Missing ingredients or a failed transfer can leave this Behavior waiting. Confirm logistics, haulers, and free space.
- A new production request isn't started until the finished item is removed from the assembler.

This is a learning baseline: test one item end-to-end before adding more recipes.
