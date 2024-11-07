# Vaiyer Ponno - Client

Vaiyer Ponno is a direct-to-consumer (D2C) e-commerce platform built with the MERN stack, allowing users to discover, compare, and purchase products from local vendors directly. This README provides an overview of the client-side repository, installation instructions, and how to get started.

## Features

- **Personalized AI Recommendations**: Users get product suggestions based on preferences.
- **Vendor Interaction**: Direct vendor-to-consumer connection for transparent pricing and faster order fulfillment.
- **Responsive UI**: Tailored for both mobile and desktop users.
- **Smooth User Experience**: Built with React and Tailwind CSS for efficient, responsive design.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: [Vaiyer Ponno Backend Repository](URL-to-backend-repo)
- **API**: Integration with backend services for product listings, AI-driven recommendations, user accounts, and more.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- NPM or Yarn
- Ensure the backend is set up and running (see backend repository for details).

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/vaiyer-ponno-client.git
    cd vaiyer-ponno-client
    ```

2. **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Environment Variables**: 
   Create a `.env` file in the root directory and add your environment variables:

    ```plaintext
    REACT_APP_API_URL=http://localhost:5000/api
    REACT_APP_MAPBOX_TOKEN=your-mapbox-token
    ```

4. **Run the application**:
    ```bash
    npm start
    # or
    yarn start
    ```

5. **Build for production**:
    ```bash
    npm run build
    ```

### Usage

- **Home Page**: View featured products and categories.
- **Product Recommendations**: Input preferences to get AI-driven suggestions.
- **User Profile**: Manage account settings, orders, and wishlist items.

