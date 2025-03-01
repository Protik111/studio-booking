# Studio Booking Application

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Ant Design](https://img.shields.io/badge/Ant%20Design-%230170FE.svg?style=for-the-badge&logo=ant-design&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

The **Studio Booking Application** is a dynamic, user-friendly front-end application designed to allow users to search for studios, check their availability, and book time slots. Built using modern front-end development practices, this application leverages React, Ant Design, and JSON data to provide a seamless booking experience.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

The Studio Booking Application includes the following key features:

1. **Studio Search**:

   - Users can search for studios by name or location.
   - Auto-complete suggestions for locations are provided.

2. **Filter by Proximity**:

   - Users can filter studios within a 10km radius based on their current geolocation.

3. **Availability Checking**:

   - View available time slots for a selected studio on a specific date.
   - Real-time updates on booked slots.

4. **Booking Functionality**:

   - Users can book available time slots by providing their name and email.
   - Bookings are stored locally and displayed in a detailed format.

5. **Responsive Design**:
   - The application is fully responsive and works seamlessly across devices.

---

## Technologies Used

- **Frontend Framework**: React (Functional Components, Hooks)
- **UI Library**: Ant Design
- **State Management**: React `useState` and `useEffect`
- **Geolocation**: `react-geolocated` and `geolib`
- **Date & Time Handling**: `dayjs`
- **Data Source**: Static JSON file (`staticData.json`)
- **Styling**: Inline CSS and Ant Design components
- **Build Tool**: Vite
