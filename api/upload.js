const { put } = require('@vercel/blob');
const multer = require('multer');
const express = require('express');

const app = express();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } 
});


app.post('/api/upload', upload.single('imageUpload'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Tidak ada file yang diunggah.' });
    }

    const filename = req.file.originalname;
    const fileBuffer = req.file.buffer;

    try {
        const blob = await put(filename, fileBuffer, {
            access: 'zeetasi', 
            contentType: req.file.mimetype
        });

        res.status(200).json({
            message: 'Gambar berhasil by zeetasi',
            url: blob.url 
        });

    } catch (error) {
        console.error('Vercel Blob Upload Error:', error);
        res.status(500).json({ error: 'Gagal mengunggah gambar: ' + error.message });
    }
});

module.exports = app;
