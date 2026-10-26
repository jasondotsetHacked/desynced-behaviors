# Desynced Behaviors

A small, text-first toolkit for creating, reviewing, debugging and sharing [Desynced](https://store.steampowered.com/app/1450900/Desynced/) unit and building Behaviors.

**Source of truth: `.bsf` (Behavior Source Format).** We use [blz-desynced-toolkit](https://github.com/johnfb/blz-desynced-toolkit) to convert between BSF and the native `.dcs` clipboard format used by Desynced. No JavaScript compiler or custom game mods are required.

## Behaviors

| Project | Purpose | Status |
| --- | --- | --- |
| [Single Assembler Mall](behaviors/single-assembler-mall/) | Storage advertises missing locked items; one assembler fulfills them | In progress: experimental storage-side BSF only |

Find all projects in [`behaviors/`](behaviors/README.md).

## Setup (Windows / PowerShell)

1. Install [uv](https://docs.astral.sh/uv/getting-started/installation/).
2. Clone this repository and install the pinned BSF toolkit dependency:

```powershell
git clone https://github.com/jasondotsetHacked/desynced-behaviors.git
cd desynced-behaviors
uv sync
```

`uv` installs Python 3.14 if needed. The toolkit uses the game's own Lua data for instruction names, argument validation, and simulation. **Supply your own game files locally**; do not commit, upload, or redistribute them.

The normal Steam installation contains `main.zip` inside `Desynced/Desynced/Content/mods/`. Set `DESYNCED_GAME_DATA` to that file's full path (change the example path to match your Steam library):

```powershell
$env:DESYNCED_GAME_DATA = "C:\Program Files (x86)\Steam\steamapps\common\Desynced\Desynced\Content\mods\main.zip"
```

This setting lasts for the current terminal session. You can also pass `--game-data "C:\...\main.zip"` to the build script. See [toolkit README](https://github.com/johnfb/blz-desynced-toolkit#setup) for other game-data layouts.

## Build and test

```powershell
# Check syntax, game instruction arguments, and suspicious control flow
uv run python scripts/bsf.py lint

# Convert every behaviors/**/*.bsf file into build/**/*.dcs
uv run python scripts/bsf.py build
```

Compiled import strings are in the gitignored `build/` directory. Open the generated `.dcs` file as plain text, **copy the full string**, and paste/import it through Desynced's in-game Behavior editor. In-game tests are still required; compiling does not prove production or logistics work.

To work with an existing Behavior, copy it from the in-game Behavior editor into a local `.dcs` text file (for example `inbox/export.dcs`). Then run:

```powershell
uv run desynced-bsf decompile --input inbox/export.dcs --output inbox/export.bsf
uv run desynced-bsf lint --input inbox/export.bsf
```

If you prefer a library of reusable sub-Behaviors, the upstream CLI also supports `import` (split embedded sub-Behaviors into files) and `export` (reassemble dependencies):

```powershell
uv run desynced-bsf import behaviors/my-library --input inbox/export.dcs
uv run desynced-bsf export behaviors/my-library my-behavior --output build/my-behavior.dcs
```

Run `uv run desynced-bsf --help` for all options. The CLI reads `DESYNCED_GAME_DATA` from your environment.

## Working together

1. Save the current Behavior as BSF, or start a new `.bsf` file.
2. Commit edits and document component/register setup in that project's README.
3. Run `lint` and `build`. Fix errors before importing.
4. Test it in Desynced. Export the game version and compare against the intended BSF when debugging.
5. Mark a Behavior **tested** only after it passes in-game.

Use [BSF format documentation](https://github.com/johnfb/blz-desynced-toolkit/blob/main/docs/behavior_source_format.md) and the [instruction index](https://github.com/johnfb/blz-desynced-toolkit/blob/main/docs/instructions_index.md) rather than guessing argument names.

### Compatibility and scope

- Toolkit dependency is pinned to a specific upstream Git commit for repeatable installs. Updating it is an explicit decision.
- Requires Python 3.14, `uv`, and a local game-data extract or `main.zip`.
- No CI builds yet: the upstream tool needs locally installed, non-redistributed game assets.
- We keep BSF source in Git. The `build/` output and game assets stay local.
