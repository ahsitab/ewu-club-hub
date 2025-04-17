# **EWU Club Hub - Student Organization Platform**  

## **Overview**  
**EWU Club Hub** is a web platform designed to connect students at **East West University (EWU)** with various clubs and organizations. It serves as a centralized hub for club discovery, event management, member communication, and administrative tasks.  

## **Features**  

### **User Features**  
- **Club Discovery**: Browse and search for clubs by category (Academic, Cultural, Sports, etc.)  
- **Event Calendar**: View upcoming club events, workshops, and meetings  
- **Membership Management**: Join clubs, track participation, and receive updates  
- **User Profiles**: Personal dashboard with club memberships and event history  
- **Discussion Forums**: Engage in club-related discussions  
- **Responsive Design**: Mobile-friendly interface  

### **Club Admin Features**  
- **Club Dashboard**: Manage club details, members, and events  
- **Event Creation**: Schedule and promote events with RSVP tracking  
- **Member Approval**: Accept/reject membership requests  
- **Announcements**: Post updates for club members  
- **Analytics**: Track engagement and member activity  

### **Super Admin (University Admin) Features**  
- **Club Approval**: Verify and approve new club registrations  
- **User Management**: Monitor student and club admin accounts  
- **System Reports**: Generate insights on club activities  
- **Content Moderation**: Ensure compliance with university policies  

## **Technologies Used**  

### **Frontend**  
- **HTML5, CSS3, JavaScript**  
- **React.js** (for dynamic UI components)  
- **Tailwind CSS** (for responsive styling)  
- **Chart.js** (for analytics visualization)  

### **Backend**  
- **Node.js & Express.js** (REST API)  
- **MongoDB** (Database for clubs, users, and events)  
- **Firebase Authentication** (User login & security)  

### **Additional Tools**  
- **GitHub** (Version control)  
- **Figma** (UI/UX design)  

## **Installation & Setup**  

### **Prerequisites**  
- Node.js (v16+)  
- MongoDB Atlas (or local MongoDB)  
- Firebase project (for authentication)  

### **Steps to Run Locally**  
1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/ewu-club-hub.git
   cd ewu-club-hub
   ```  

2. **Install dependencies**  
   ```bash
   npm install
   cd client && npm install
   ```  

3. **Set up environment variables**  
   - Create a `.env` file in the root directory:  
     ```env
     MONGODB_URI=your_mongodb_connection_string
     FIREBASE_API_KEY=your_firebase_key
     ```  

4. **Run the application**  
   - Start the backend:  
     ```bash
     npm start
     ```  
   - Start the frontend:  
     ```bash
     cd client && npm start
     ```  

5. **Access the app**  
   - Open `http://localhost:3000` in your browser.  

## **Project Structure**  
```
ewu-club-hub/  
├── client/                # Frontend (React)  
│   ├── public/            # Static files  
│   ├── src/               # React components  
│   │   ├── components/    # Reusable UI elements  
│   │   ├── pages/         # Main views (Clubs, Events, Profile)  
│   │   ├── App.js         # Main app router  
│   │   └── index.js       # React entry point  
├── server/                # Backend (Node.js)  
│   ├── models/            # MongoDB schemas  
│   ├── routes/            # API endpoints  
│   ├── app.js             # Express server setup  
│   └── config/            # Database & auth config  
├── .env                   # Environment variables  
├── package.json           # Backend dependencies  
└── README.md              # Project documentation  
```  

## **Demo Accounts**  
- **Student User**:  
  - Email: `student@ewu.edu`  
  - Password: `student123`  
- **Club Admin**:  
  - Email: `clubadmin@ewu.edu`  
  - Password: `admin123`  
- **Super Admin (University)**:  
  - Email: `superadmin@ewu.edu`  
  - Password: `superadmin123`  

## **Future Enhancements**  
✅ **Mobile App** (React Native)  
✅ **Automated Email Notifications** (Nodemailer)  
✅ **Club Funding Requests** (Integration with university finance)  
✅ **AI-Powered Club Recommendations**  

## **Contributing**  
We welcome contributions! Follow these steps:  
1. **Fork** the repository  
2. Create a **new branch** (`git checkout -b feature/new-feature`)  
3. **Commit** your changes (`git commit -m "Add new feature"`)  
4. **Push** to the branch (`git push origin feature/new-feature`)  
5. Open a **Pull Request**  

## **License**  
This project is licensed under the **MIT License**.  

## **Contact**  
For support or inquiries, contact:  
📧 **Email**: ewuclubhub@ewu.edu  
🌐 **Website**: [https://ewu-club-hub.vercel.app](https://ewu-club-hub.vercel.app)  

---  
**Made with ❤️ by EWU Developers** 🚀
