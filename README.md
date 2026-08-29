# TravelTrucks

TravelTrucks is a camper rental web application built with Next.js and TypeScript.

The application allows users to browse available campervans, filter them by different criteria, view detailed camper information, read customer reviews, explore the image gallery, and submit a booking request.

## Features

- Home page with a hero section and navigation to the camper catalog
- Camper catalog with server-side filtering
- Filtering by:
  - location
  - camper form
  - engine
  - transmission
- Pagination with the `Load More` button
- Camper details page
- Customer reviews with five-star ratings
- Camper image gallery
- Booking form with validation
- Booking requests sent to the backend API
- Success notification after successful booking
- Loading and error states for asynchronous requests

## Technologies

- Next.js
- React
- TypeScript
- TanStack Query
- CSS Modules
- Next.js App Router

## Getting Started

### Installation

Clone the repository:

```bash
git clone https://github.com/Slava-S943/travel-trucks.git

Navigate to the project directory:

cd travel-trucks

Install dependencies:

npm install
Development

Run the development server:

npm run dev

Open http://localhost:3000 in your browser.

Production

Create a production build:

npm run build

Start the production server:

npm run start
Available Routes
/ — Home page
/catalog — Camper catalog
/catalog/[camperId] — Camper details page
Backend API

The application uses the TravelTrucks Campers API.

API base URL:

https://campers-api.goit.study

API documentation:

https://campers-api.goit.study/docs

Scripts

Run the development server:

npm run dev

Run ESLint:

npm run lint

Create a production build:

npm run build

Start the production server:

npm run start
Author

Slava S943

GitHub: https://github.com/Slava-S943/travel-trucks
```
