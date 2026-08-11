#!/bin/sh
set -eu

failures=0

fail() {
  printf "fail: %s\n" "$1" >&2
  failures=$((failures + 1))
}

# machine-specific absolute path check
if command -v rg >/dev/null 2>&1; then
  if rg -n '(/[U]sers/|/[h]ome/)' .apm/skills --hidden -g '!/.git/**' >/tmp/yq-skills-paths.$$; then
    while IFS= read -r match; do
      fail "machine-specific absolute path found: $match"
    done </tmp/yq-skills-paths.$$
  fi
  rm -f /tmp/yq-skills-paths.$$
else
  printf "info: rg not installed; skipping machine-specific path check\n"
fi

# skills symlink check
if [ ! -L "skills" ]; then
  fail "skills must be a symlink to .apm/skills"
else
  skills_target=$(readlink "skills")
  [ "$skills_target" = ".apm/skills" ] || fail "skills symlink points to '$skills_target', expected '.apm/skills'"
fi

# per-skill validation
for skill_dir in .apm/skills/*; do
  [ -d "$skill_dir" ] || continue
  skill_name=$(basename "$skill_dir")
  skill_file="$skill_dir/SKILL.md"

  if [ ! -f "$skill_file" ]; then
    fail "missing SKILL.md: $skill_dir"
    continue
  fi

  first_line=$(sed -n '1p' "$skill_file")
  [ "$first_line" = "---" ] || fail "$skill_file must start with YAML frontmatter"

  declared_name=$(sed -n 's/^name: *//p' "$skill_file" | head -n 1)
  description=$(sed -n 's/^description: *//p' "$skill_file" | head -n 1)

  [ -n "$declared_name" ] || fail "$skill_file missing name"
  [ -n "$description" ] || fail "$skill_file missing description"
  [ "$declared_name" = "$skill_name" ] || fail "$skill_file name '$declared_name' does not match directory '$skill_name'"
done

if [ "$failures" -gt 0 ]; then
  printf "validation failed: %s issue(s)\n" "$failures" >&2
  exit 1
fi

printf "validation passed\n"
