/**
 * Assembler side of the Single Assembler Mall.
 *
 * P1 storage: reference the target storage building entity.
 * P2 production: link to the assembler's production/recipe input register.
 *
 * Requires available ingredients and logistics to move output to storage.
 * Desynced compiler intrinsics are not ordinary JavaScript functions.
 */
export function assemblerMall(storage, production) {
  while (true) {
    const wanted = readSignal(storage);

    if (wanted && canProduce(wanted)) {
      const oneItem = setNumber(wanted, 1);

      // If we already hold the output, do not start a duplicate job.
      if (!self.hasItem(oneItem)) {
        production = oneItem;
        while (!self.hasItem(oneItem)) {
          wait(10);
        }
      }

      production = undefined;
      orderTransfer(storage, oneItem);

      // Wait for delivery; never spam repeated production orders.
      while (self.hasItem(oneItem)) {
        wait(10);
      }
    } else {
      // Storage is full or the requested recipe is unsupported.
      production = undefined;
    }

    wait(15);
  }
}
