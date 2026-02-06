# Budget and Expense Tracker

## Description
A modern budget and expense tracker that allows users to add, remove and edit transactions, monitor monthly spending, and set custom budgets for different expense categories. I built this project after using simple spreadsheets to track my personal finances, wanting a more elegant and visual representation. The app demonstrates what a dedicated web-based expense tracker could look like, with clear controls and an intuitive interface for managing personal finances. 

The app was designed for personal use, and so does not include user authentication or individual user accounts. All data is stored globally in the database, which is a noticeable limitation of the app in its current state. Adding user accounts, authentication and individual data storage would transform the app from a personal use demonstration to a production ready application. These changes are planned for future iterations.

## Tech Stack
This project was built using Vite with React, TypeScript and Tailwind CSS for the frontend, and Express.js, Prisma and PostgreSQL for the backend and database.

I chose this tech stack to gain hands on experience with TypeScript, Express.js and Prisma, whilst deepening my understanding of React and Tailwind CSS. I selected Vite as the build tool for this project, because of its fast development experience with instant hot module replacement and native support for both React and TypeScript. It also handles production bundling and optimization automatically.

## Presentation

### The Main Dashboard

- Quick overview of budgets, recent transactions and categories of expenses.
- Displays overall balance and monthly figures.
- Accessible navigation links to full transaction and budget pages.
- Button for adding new transactions quickly from the navigation bar.
- Input a new incoming / outgoing amount under a specific category with an optional description.

<img width="3420" height="1986" alt="image" src="https://github.com/user-attachments/assets/8480e8a8-7737-43e4-8ff2-2d3f4d82ed93" />

![Add-Transaction](https://github.com/user-attachments/assets/e56ad1f0-159b-429b-8a25-496cc2699e0e)

### Transactions Page

- All submitted transactions, ordered by date from most recent to oldest, displayed in a list format.
- Edit and delete features are accessible through the ellipsis icon next to each transaction.
- Editing modal pre-populated with data specific to that transaction to improve quality of life and ease of use.

<img width="3420" height="1984" alt="image" src="https://github.com/user-attachments/assets/4ae1c65d-c505-41d3-b785-57975e7d57f9" />

![Edit-Delete-Transaction](https://github.com/user-attachments/assets/563ac836-39b2-4c67-ae12-b898a7d11aed)

### Budgets Page

- All categories with their associated budgets in descending order from highest budget to lowest, displayed in a list format.
- Edit and delete features are accessible through the ellipsis icon next to each category's progress bar.
- Editing modal pre-populated with the budget amount specific to that category to improve quality of life and ease of use.

<img width="3420" height="1984" alt="image" src="https://github.com/user-attachments/assets/51044a00-2166-44db-b827-3da0d65983bc" />

<img width="3420" height="1984" alt="image" src="https://github.com/user-attachments/assets/c3d20b10-7a36-4ba1-a415-d12646f8d2b9" />

### Responsive Design

- Layout changes to a stacked list format, with each core feature separated into it's own space.
- Add transaction button conveniently placed at the bottom of the viewport and is always visible for quality of life.
- Navigation bar links collapse to be displayed in a dropdown menu.
- Current page title displayed at the top.

<img width="320" height="625" alt="image" src="https://github.com/user-attachments/assets/dd74973c-eadc-4da1-8eff-b97d74a57db3" />

<img width="320" height="625" alt="image" src="https://github.com/user-attachments/assets/d2e82521-fbef-4e54-88e1-c1c7b56d6c3e" />

<img width="320" height="625" alt="image" src="https://github.com/user-attachments/assets/4ec38f53-17c6-4d0b-a3a6-0c095494927f" />


