# Real Estate Application

> [!NOTE]
> **Work in Progress**: This project is currently under active development. Features and documentation are subject to change.

## Overview

This is a modern real estate application designed to facilitate buying, selling, and renting properties. It aims to provide a seamless user experience with interactive maps, advanced filtering, and secure user management.

**Note:** This README will be updated with more detailed documentation, setup instructions, and contribution guidelines as the project nears completion.

## Tech Stack

This project utilizes a robust modern tech stack to ensure performance, scalability, and developer experience.

### Client
- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Maps**: [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React, FontAwesome

### Server
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (via Prisma)
- **Storage**: AWS S3 (via AWS SDK)
- **Authentication**: JSON Web Tokens (JWT)

## Features (Planned/In-Progress)

- **Property Listings**: Browse and search for properties with advanced filters.
- **Interactive Maps**: View property locations on a dynamic map.
- **User Accounts**: Secure authentication and profile management.
- **Property Management**: List new properties with image uploads.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Getting Started

To run this project locally, you will need to set up both the client and the server.

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL database

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd real-estate-application
    ```

2.  **Setup Server**
    ```bash
    cd server
    npm install
    # Configure .env file (see .env.example)
    npm run dev
    ```

3.  **Setup Client**
    ```bash
    cd ../client
    npm install
    # Configure .env.local file
    npm run dev
    ```

## License

[ISC](https://opensource.org/licenses/ISC)
