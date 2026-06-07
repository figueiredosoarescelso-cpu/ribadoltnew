#!/bin/bash
set -e
# Encontra o ficheiro principal gerado pelo build
MAIN=$(ls dist/server/assets/server-*.js | head -1)
echo "Found server entry: $MAIN"
# Cria o wrangler.json apontando para esse ficheiro
cat > dist/server/wrangler.json << WRANGLER
{
  "name": "ribadoltnew",
  "compatibility_date": "2025-09-24",
  "compatibility_flags": ["nodejs_compat"],
  "main": "$MAIN"
}
WRANGLER
echo "Created dist/server/wrangler.json"
npx wrangler deploy --config dist/server/wrangler.json
