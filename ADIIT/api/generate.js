export const config = {
    api: {
        bodyParser: false, 
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const TARGET_API_URL = 'https://api.freepik.com/v1/video/generate'; 
        const userApiKey = req.headers['x-user-api-key'];

        if (!userApiKey) {
            return res.status(401).json({ error: 'API Key tidak ditemukan.' });
        }

        const response = await fetch(TARGET_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userApiKey}`,
                'Content-Type': req.headers['content-type'],
                'Accept': 'application/json'
            },
            body: req,
            duplex: 'half'
        });

        const data = await response.json();
        res.status(response.status).json(data);

    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
