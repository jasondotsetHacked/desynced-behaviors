/**
 * Storage side of the Single Assembler Mall.
 *
 * P1 request: link to this storage building's Signal register.
 *
 * Fix one empty inventory slot per desired non-stackable component.
 * Get First Locked Id reads this building's inventory.
 */
export function storageMissing(request) {
  while (true) {
    request = getFirstLocked0();
    wait(15);
  }
}
