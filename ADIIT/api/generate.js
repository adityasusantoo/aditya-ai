// File: api/generate.js

export const config = {
    api: {
        // Matikan parser bawaan Vercel agar kita bisa meneruskan file gambar/video (stream FormData) secara langsung
        bodyParser: false, 
    },
};

export default async function handler(req, res) {
    // Pastikan request yang masuk adalah POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        /* * [PENTING] GANTI URL DI BAWAH SESUAI DENGAN DOKUMENTASI API YANG ANDA PAKAI
         * Contoh Freepik: 'https://api.freepik.com/v1/video/generate'
         * Contoh Magnific: 'https://api.magnific.ai/v1/video/generate' (silakan cek dok Magnific)
         */
        const TARGET_API_URL = 'https://api.freepik.com/v1/video/generate'; 

        // Mengambil API Key yang dikirim dari file index.html (melalui headers)
        const userApiKey = req.headers['x-user-api-key'];

        if (!userApiKey) {
            return res.status(401).json({ error: 'API Key tidak ditemukan.' });
        }

        // Meneruskan request (beserta file gambar/video) langsung ke API tujuan
        const response = await fetch(TARGET_API_URL, {
            method: 'POST',
            headers: {
                // Menggunakan API Key yang dimasukkan pengguna
                'Authorization': `Bearer ${userApiKey}`,
                // Meneruskan Content-Type bawaan agar format file (multipart/form-data boundary) tidak rusak
                'Content-Type': req.headers['content-type'],
                'Accept': 'application/json'
            },
            body: req, // Meneruskan data langsung secara stream
            duplex: 'half' // Diperlukan oleh Node.js saat melakukan fetch dengan stream
        });

        // Menangkap balasan dari server API (Magnific/Freepik)
        const data = await response.json();
        
        // Mengembalikan balasan tersebut ke website Anda
        res.status(response.status).json(data);

    } catch (error) {
        console.error('Terjadi kesalahan pada proxy:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}