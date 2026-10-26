# Desynced Behaviors

A small, code-first toolkit for [Desynced](https://www.desyncedgame.com/) Behavior programs.

Write Behaviors in JavaScript, compile them into strings Desynced can import, and keep the source in Git.

## Behavior directory

| Project | Purpose | Status |
| --- | --- | --- |
| [Single Assembler Mall](behaviors/single-assembler-mall/) | Fill empty locked slots in storage with one shared assembler | Experimental: needs compilation and in-game testing |

Each project gets its own folder under [`behaviors/`](behaviors/).

## Start here

Requires Node.js and npm.

```bash
git clone https://github.com/jasondotsetHacked/desynced-behaviors.git
cd desynced-behaviors
npm install
npm run check
npm run build
```

The build scans `behaviors/` for `.js` and `.ts` files. For each source file it runs **`js2ds`** then **`ds-as`** from the community [desynced-tools](https://github.com/ribrdb/desynced-tools) package.

Generated import strings appear next to each source file as `<source>.asm.txt`. Copy the entire string into Desynced's Behavior import UI.

`npm run check` checks JavaScript syntax only. `npm run build` requires the compiler dependency and does not prove a Behavior works in-game.

## Useful tools

- `js2ds file.js`: JavaScript/TypeScript to Desynced assembly.
- `ds-as file.asm`: assembly to a game import string.
- `ds-disas export.txt`: exported game string to assembly.
- [Community browser editor](https://desynced-behavior-editor.web.app/).

These are **Desynced compiler instructions**, not normal JavaScript functions. The compiler supports only a subset of JS/TS.

## Compatibility

This toolkit is new and untested with the current Desynced release. The community compiler may lag behind game instructions; a successful compile is not an in-game validation. Keep imported strings in-game tested before calling a Behavior stable.

No automation framework, deployment service, or CI is needed to get started.
