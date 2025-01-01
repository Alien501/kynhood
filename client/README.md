# 📰 **News Aggregator PWA**

An intuitive **Progressive Web Application (PWA)** that aggregates local news from various sources, tailored to user preferences (Made for KYNHood Hackathon).

⚠️ **Note:** Currently, the application is optimized only for **mobile screens**. It may not be fully responsive on larger screens.

## 🚀 **Tech Stack**

### **Frontend:**
- **React**: Component-based UI library
- **TypeScript**: Static typing for robust code
- **TailwindCSS**: Utility-first CSS framework
- **Shadcn**: Modern UI components
- **JWT Auth**: Secure authentication
- **PWA Support**: Offline capabilities and app-like experience

### **Backend:**
- **Node.js**: JavaScript runtime
- **Express.js**: Backend framework
- **Zod**: Schema validation
- **Prisma**: ORM for MongoDB
- **MongoDB (Dockerized)**: NoSQL database
- **Docker**: Containerization for backend services

---

## 🛠️ **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/Alien501/kynhood.git
cd kynhood
```

### **2. Frontend Setup**
```bash
cd client
npm install
npm run dev
```
- Access client at: **http://localhost:5173/**
- Build for production:
```bash
npm run build
```

### **3. Backend Setup**
```bash
cd backend
```
1. **Start MongoDB Container:**
```bash
docker compose up -d --build
```
2. **Install Dependencies:**
```bash
cd server
npm install
npx prisma generate
```
3. **Start Server:**
- For Development:
```bash
npm run dev
```
- For Production:
```bash
npm run start
```

---

## 📷 **Project Overview**
`Note: Only mobile screens where targeted while development`


![Home Screen](/images/home.png)
![Read Screen](/images/read.png)
[![Demo Video](/images/demo.mp4)](/images/demo.mp4)

---

## 📄 **Manifest File**
A `site.webmanifest` file is included for PWA support.

---

## 🤝 **Contributing**
Contributions are welcome! Feel free to fork, open issues, or submit pull requests.

---

## 📜 **License**
This project is licensed under the [MIT License](LICENSE).

---

🛡️ **Happy Coding!** 🚀✨
