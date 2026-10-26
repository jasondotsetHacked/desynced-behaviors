#!/usr/bin/env python3
"""Lint or compile BSF sources using blz-desynced-toolkit and local game data."""

import argparse
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "behaviors"
BUILD_DIR = ROOT / "build"


def main() -> int:
    parser = argparse.ArgumentParser(description="Build or lint Desynced BSF Behaviors")
    parser.add_argument("action", choices=("lint", "build"))
    parser.add_argument(
        "--game-data",
        type=Path,
        default=os.environ.get("DESYNCED_GAME_DATA"),
        help="Path to Desynced's main.zip or extracted game data directory",
    )
    args = parser.parse_args()

    sources = sorted(SOURCE_DIR.rglob("*.bsf"))
    if not sources:
        print("No .bsf files under behaviors/ yet.")
        return 0

    if args.game_data is None:
        parser.error("set DESYNCED_GAME_DATA to the game's main.zip path, or pass --game-data")
    game_data = Path(args.game_data).expanduser().resolve()
    if not game_data.exists():
        parser.error(f"game data not found: {game_data}")

    command = [
        sys.executable,
        "-m",
        "blz.desynced_toolkit.bsf",
        "--game-data",
        str(game_data),
    ]

    for source in sources:
        relative = source.relative_to(SOURCE_DIR)
        print(f"{args.action}: {relative}", flush=True)
        if args.action == "lint":
            cmd = [*command, "lint", "--input", str(source)]
        else:
            output = (BUILD_DIR / relative).with_suffix(".dcs")
            output.parent.mkdir(parents=True, exist_ok=True)
            cmd = [
                *command,
                "compile",
                "--input",
                str(source),
                "--output",
                str(output),
            ]
        result = subprocess.run(cmd, cwd=ROOT, check=False)
        if result.returncode != 0:
            print(f"Failed on {relative} (exit {result.returncode})", file=sys.stderr)
            return result.returncode
    print(f"{args.action} complete: {len(sources)} Behavior(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
