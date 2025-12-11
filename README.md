# Rewards Program App

A React application to calculate customer reward points based on transaction history.

## Setup Instructions

1.  **Clone the repository**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the application:**
    ```bash
    npm run dev
    ```
4.  **Run Unit Tests:**
    ```bash
    npm test
    ```

## Project Overview

- **Framework:** React + Vite
- **Styling:** Styled Components
- **Logging:** Pino
- **Data:** Local JSON Mock (simulated Async API)

## Features

- **Customer Selection:** Dropdown to view specific customer data.
- **Reward Calculation:**
  - 2 points for every dollar spent over $100.
  - 1 point for every dollar spent between $50 and $100.
- **Filtering:** Filter by Year and Month.
- **Summary:** View monthly and total reward points.
- **Drill-down:** View detailed transaction history per month.

## API Simulation
Data is fetched from `public/data/transactions.json` with a simulated delay and logging via `src/api/mockApi.js`.