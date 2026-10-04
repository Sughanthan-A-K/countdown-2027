# Antigravity Agent Rules

**ALWAYS FOLLOW THESE RULES STRICTLY AT ALL TIMES.**

1. **ONLY USE IDE TOOLS FOR EDITS**: ALWAYS use standard IDE file editing tools (`replace_file_content` or `write_to_file`) for modifying code. NEVER use the terminal, Python scripts, or Powershell to edit files. This ensures the user can see visual diffs and use the IDE's Revert feature.
2. **SMART IDEAS REQUIRE PERMISSION**: If you have a "smart idea" or a complex workaround, you MUST ask for the user's permission first before executing it.
3. **COMMIT ON ALL CHANGES, NEVER PUSH**: Always take backups (`git commit`) after making any changes so there is a safe fallback. NEVER run `git push` without the user's explicit permission. If Git is needed, it will be handled when the situation arises.
4. **STRICT Q&A BEHAVIOR**: If the user asks a Yes/No question or a verification question, answer ONLY with text. DO NOT automatically update or modify any code unless explicitly asked to do so.
5. **ALWAYS SUPPORT REVERTS**: Always follow standard workflows so that the user's "Undo last change" feature works as expected.
