# UK Stander - Rainforest API Hunter Setup

To avoid IP blocks and CAPTCHAs, we use **Rainforest API** to fetch live Amazon UK products. 

## 1. Direct Integration (Recommended)

You can now manage your Rainforest API key directly from the **Admin Dashboard** under the **Global Content Settings** tab. 

- **Automated Hunts**: Simply enter a search term in the "Trends" tab and click **Rainforest Sync**.
- **Credit Management**: When your 100-request limit is reached, you can easily swap in a new key via the Admin Panel without touching any code.

## 2. External Server Option (Optional)

```bash
cd ~/uk-hunter
npm install axios dotenv
```

## 2. Configuration (.env)

Make sure your `.env` contains:

```env
RAINFOREST_API_KEY=your_rainforest_key_here
MAIN_SERVER_URL=https://ais-pre-om3ylr4hsc34mj7e7gsjoc-975737920507.asia-southeast1.run.app
EXTERNAL_SYNC_KEY=uk-stander-sync-2026
```

## 3. The Hunter Script (rainforest_hunter.js)

Create this file on your server:

```javascript
const axios = require('axios');
require('dotenv').config();

const RAINFOREST_KEY = process.env.RAINFOREST_API_KEY;
const DASHBOARD_URL = `${process.env.MAIN_SERVER_URL}/api/external/import-suggestions`;
const SYNC_KEY = process.env.EXTERNAL_SYNC_KEY || 'uk-stander-sync-2026';

async function runHunt() {
    console.log("--- Starting Rainforest Amazon UK Hunt ---");

    if (!RAINFOREST_KEY) {
        console.error("❌ RAINFOREST_API_KEY is missing in .env");
        return;
    }

    try {
        // 1. Fetch Search Results from Rainforest (Amazon UK)
        console.log("Searching Amazon UK for trending products...");
        const rfResponse = await axios.get('https://api.rainforestapi.com/request', {
            params: {
                api_key: RAINFOREST_KEY,
                type: 'search',
                amazon_domain: 'amazon.co.uk',
                search_term: 'trending air fryers electronics' // Customize your search
            }
        });

        const items = rfResponse.data.search_results || [];
        console.log(`Found ${items.length} products. Porting to dashboard...`);

        // 2. Format for Dashboard
        const products = items.map(item => ({
            title: item.title,
            price: item.price?.value || "0.00",
            link: item.link,
            category: "Discoveries",
            image_url: item.image,
            trend_reason: `Rainforest UK discovery: Rating ${item.rating || 'N/A'}`
        }));

        // 3. Sync to Dashboard
        const syncResponse = await axios.post(DASHBOARD_URL, {
            authKey: SYNC_KEY,
            products: products
        });

        console.log("✅ Sync Results:", syncResponse.data);
    } catch (error) {
        console.error("❌ Hunt Failed:", error.response ? error.response.data : error.message);
    }
}

runHunt();
```

## 4. Running with PM2

```bash
pm2 start rainforest_hunter.js --name uk-rainforest --cron "0 */6 * * *"
pm2 save
```

Your server will now automatically hunt via Rainforest every 6 hours and feed the dashboard suggestions!
