with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# The briefing text currently has: act===2?(BLOCK_OLD2):(BLOCK_OLD3)
# We want: act===2?'SIMPLE':act===3?(BLOCK_OLD2):(BLOCK_OLD3)
#
# Strategy: Replace the opening "act===2?(" with new text + "act===3?("
# The rest of the structure stays the same.

# Find the unique prefix in the briefing section
old_open = "act===2?(transRoute==='A'?"
new_open = "act===2?'\uc801\uc751 \uae30\uac04 \uc644\ub8cc.\n\uae30\uc9c0 \uc6b4\uc601 \uc815\uc0c1\ud654.\nAct 2 \uc791\uc804 \ub2e8\uacc4\ub85c \uc9c4\uc785\ud569\ub2c8\ub2e4.':act===3?(transRoute==='A'?"

count = content.count(old_open)
if count == 1:
    content = content.replace(old_open, new_open)
    print(f"Replaced briefing opening (1 occurrence)")
elif count == 0:
    print("ERROR: briefing opening not found")
else:
    print(f"WARNING: {count} occurrences found, replacing first only")
    content = content.replace(old_open, new_open, 1)

# Also update PRIORITY display: act===2 is now "INITIAL", acts 3-4 are elevated/critical
# Current: act===2?'ELEVATED':'CR\u2588TICAL'
# New: act===2?'INITIAL':act===3?'ELEVATED':'CR\u2588TICAL'
old_priority = "act===2?'ELEVATED':'CR\\u2588TICAL'"
new_priority = "act===2?'INITIAL':act===3?'ELEVATED':'CR\\u2588TICAL'"
if old_priority in content:
    content = content.replace(old_priority, new_priority)
    print("Priority display updated")
else:
    # Try the literal unicode version
    old_priority2 = "act===2?'ELEVATED':'CR\u2588TICAL'"
    new_priority2 = "act===2?'INITIAL':act===3?'ELEVATED':'CR\u2588TICAL'"
    if old_priority2 in content:
        content = content.replace(old_priority2, new_priority2)
        print("Priority display updated (unicode version)")
    else:
        print("WARNING: priority string not found")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done.")
