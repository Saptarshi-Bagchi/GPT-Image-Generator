# ✨GPT Image Generator

A full-stack image generator powered by OpenAI's `gpt-image-1` model. Generated images are uploaded to Cloudinary and their gallery records are saved in MongoDB.

## ⚙️ Tech Stack

- Node.js 18
- Vite
- OpenAI
- Cloudinary
- MongoDB

## 🛠️ Setup

Install dependencies in each app:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Create `backend/.env` with these values:

```env
OPENAI_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
MONGO_URL=your_mongodb_connection_string
```

Run the backend on port 9000:

```bash
cd backend
node app.js
```

In another terminal, run the frontend:

```bash
cd frontend
npm run dev
```

## 🌐 License

This project was made for educational purposes