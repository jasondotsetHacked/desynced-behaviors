# Single Assembler Mall

**Status: experimental — storage side is a first BSF prototype, not yet tested in-game.** The assembler Behavior still needs to be authored and tested.

## Goal

One storage building acts as a wishlist: fixed/locked empty component slots describe what should be stocked. One general-purpose assembler reads the requested item, produces one, and transfers it back to storage.

## Plan

1. **Storage:** `storage.bsf` reads `Get First Locked Id` from its own storage and writes the result to the building's Signal register. Wait briefly and repeat.
2. **Assembler (next):** read that Signal on the linked storage entity, check the requested item is craftable, set the production component register, await completion, and transfer the result.
3. **Test:** start with one locked, empty slot for a non-stackable component. Check Signal; then build the assembler half and verify production and delivery. After that, try two item types and a full-storage state.

## Storage-side setup (first test)

- Build a storage unit/building with inventory and a way to run a Behavior (such as a Behavior Controller).
- Fix one empty inventory slot to an item type.
- Run `uv run python scripts/bsf.py build` at the repository root.
- Import `build/single-assembler-mall/storage.dcs` into the storage's Behavior Controller.
- Watch the storage's **Signal** register. It should show the item type of the first missing locked slot. Fill the slot and confirm it clears or moves to the next missing item.

`storage.bsf` uses `get_first_locked_0`, `set_reg`, `wait`, and `restart`, with argument names drawn from the upstream instruction index. **We have not validated the import or runtime behavior in Desynced yet.**

## Outstanding

- Confirm BSF compilation using your installed game data.
- Confirm storage Signal behavior in game.
- Author and test `assembler.bsf` with reliable production, transfer, and no duplicate orders.
- Add recovery handling for missing ingredients and failed deliveries.
- Update the status after repeatable in-game tests.

Do not assume an empty fixed slot represents a minimum stock level. This design initially targets one non-stackable component per locked slot.
