#!/bin/bash
set -e
MAIN=$(ls dist/server/assets/server-*.js | head -1 | sed 's|dist/server/||')
echo "Found server entry: $MAIN"
cat > dist/server/wrangler.json << WRANGLER
{
  "name": "ribadoltnew",
  "compatibility_date": "2025-09-24",
  "compatibility_flags": ["nodejs_compat"],
  "main": "$MAIN"
}
WRANGLER
echo "Created dist/server/wrangler.json with main: $MAIN"
npx wrangler deploy --config dist/server/wrangler.json
