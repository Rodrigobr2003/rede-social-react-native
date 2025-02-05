# Orbee

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

**Orbee** is an app inspired by Facebook, where users can create an account, make friends, chat in real-time, post photos, and much more. The mobile version was built with **React Native**, using **TypeScript** and **Node.js** for the back end, and **MongoDB** as the database.

## Description

**Orbee** provides an intuitive and modern social networking experience. It allows users to:

- Create their accounts.
- Add and interact with friends.
- Exchange messages in real-time.
- Post photos and share content with the community.

With a user-friendly interface and robust features, Orbee delivers a social media experience similar to other platforms, focusing on simplicity and performance.

---

## Installation Instructions

### Prerequisites

Before getting started, ensure you have the following software installed:

- [Node.js](https://nodejs.org/en/) - Version 14.x or higher.
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (optional, but recommended).
- [MongoDB](https://www.mongodb.com/try/download/community) for the local database (or use a cloud instance).
- [React Native CLI](https://reactnative.dev/docs/environment-setup).

### Environment Setup
To ensure the project runs correctly, you need to create a `.env` file in the `backend` directory root, containing the following environment variables:

   ```bash
   CONNECTION=<your_mongodb_connection_string>
   SECRETKEY=<your_secret_key_for_sessions>
   ```
- **CONNECTION:** Enter your MongoDB database connection string.
- **SECRETKEY:** Set a secret key to manage authentication sessions.

  **Important:** Never share your actual credentials publicly.

### Steps

1. **Clone this repository:**

   ```bash
   git clone https://github.com/Rodrigobr2003/rede-social-react-native.git
   ```

2. **Install all packages:**

   ```bash
   cd frontend

   npm install

   cd ..

   cd backend
   
   npm install

   cd ..
   ```

3. **Run the backend directory:**

   ```bash
   cd backend

   npm start
   ```

4. **Run the frontend directory:**

   ```bash
   cd frontend

   npm start
   ```

  - Select the option "Press a │ open Android" to emulate the app on your computer!
  - Or scan the QR Code available in the terminal!
