# Budget and Expense Tracker

## Description
A modern budget and expense tracker that allows users to add, remove and edit transactions, monitor monthly spending, and set custom budgets for different expense categories. I built this project after using simple spreadsheets to track my personal finances, wanting a more elegant and visual representation. The app demonstrates what a dedicated web-based expense tracker could look like, with clear controls and an intuitive interface for managing personal finances. 

The app was designed for personal use, and so does not include user authentication or individual user accounts. All data is stored globally in the database, which is a noticeable limitation of the app in its current state. Adding user accounts, authentication and individual data storage would transform the app from a personal use demonstration to a production ready application. These changes are planned for future iterations.

## Tech Stack
This project was built using Vite with React, TypeScript and Tailwind CSS for the frontend, and Express.js, Prisma and PostgreSQL for the backend and database.

I chose this tech stack to gain hands on experience with TypeScript, Express.js and Prisma, whilst deepening my understanding of React and Tailwind CSS. I selected Vite as the build tool for this project, because of its fast development experience with instant hot module replacement and native support for both React and TypeScript. It also handles production bundling and optimization automatically.

## Features
- **Dashboard Overview** - View your available balance, monthly spending statistics, recent transactions and budget progress all from the home page.
- **Quick Transaction Entry** - Add new transactions easily through the always-accessible button in the navbar (desktop) or base of the screen (mobile).
- **Category Management** - Organise transactions into specific categories to track your spending patterns.
- **Transaction History** - View your complete transaction history on a dedicated page, ordered from most recent to oldest.
- **Budget Monitoring** - Track monthly budgets with percentage used and colour-coded progression bars for a quick at-a-glance status review.
- **Full Edit Control** - Modify or delete any transaction or budget through their dedicated pages.
- **Responsive Design** - Seamless viewing experience across desktop, tablet and mobile devices.
- **Real-Time Updates** - Balance and budget calculations update in real-time as you add, modify or delete transactions.

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

![Edit-Delete-Budgets](https://github.com/user-attachments/assets/c0ad2f9b-0d11-440a-8fec-86adb1b80388)

### Responsive Design

- Layout changes to a stacked list format, with each core feature separated into it's own space.
- Add transaction button conveniently placed at the bottom of the viewport and is always visible for quality of life.
- Navigation bar links collapse to be displayed in a dropdown menu.
- Current page title displayed at the top.

<img width="250" height="525" alt="image" src="https://github.com/user-attachments/assets/dd74973c-eadc-4da1-8eff-b97d74a57db3" />

<img width="250" height="525" alt="image" src="https://github.com/user-attachments/assets/d2e82521-fbef-4e54-88e1-c1c7b56d6c3e" />

<img width="250" height="525" alt="image" src="https://github.com/user-attachments/assets/4ec38f53-17c6-4d0b-a3a6-0c095494927f" />

## Installation

### Prerequisites
Make sure that you have the following installed:
- Node.js v20.x or higher
- PostgreSQL v14 or higher

Begin by cloning the repo:
```bash
git clone https://github.com/EJFieldy/budgeting-app.git budget_tracker
cd budget_tracker
```

### Backend

1. Create a new PostgreSQL database:
```bash
createdb budget_tracker
```

2. Navigate to the server directory:
```bash
cd server
```

3. Copy the .env template file:
```bash
cp .env.example .env
```

4. Edit `.env` with your PostgreSQL credentials:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/budget_tracker"
PORT=3000
```

5. Install necessary dependencies:
```bash
npm install
```

6. Run migrations:
```bash
npx prisma migrate dev
```

7. Seed the database:
```bash
npx prisma db seed
```

### Frontend

1. Navigate to the client directory:
```bash
cd ../client
```

2. Copy the .env.example file:
```bash
cp .env.example .env
```

3. Edit `.env` with your backend API_URL if different from default:
```env
VITE_API_URL=http://localhost:3000
# or set it to your local ip to view on mobile
VITE_API_URL=http://YOUR_IP_HERE:3000
```

4. Install dependencies:
```bash
npm install
```

## Running the Application

Start both servers in separate terminal windows:

**Backend** (from the `server` directory):
```bash
npm run dev
```

**Frontend** (from the `client` directory):
```bash
npm run dev
```

The application will be available at the default Vite port `http://localhost:5173` (frontend) with the API running on `http://localhost:3000` (backend).

### Project Review

## What I Learned
The project taught me how to use type-safe variables within React components and Express.js API routes, shifting me away from plain JavaScript. Type safety wasn't something I had encountered prior to this project making it a prominent challenge throughout the project. Learning when to use inferred types vs explicit types, and accounting for potentially null or undefined values were particularly challenges areas for me.


### NOTES TO WORK ON TOMORROW MORNING
**Areas That Show Problem-Solving**
Think about moments where you had to:

Debug something that wasn't working as expected
Research how to implement a feature you hadn't done before
Refactor code to make it cleaner or more efficient
Make trade-offs between different approaches

**Questions to Ask Yourself**

What was surprisingly difficult that seemed simple at first?
What technology or pattern did you use for the first time in this project?
What would you do differently if you rebuilt this from scratch?
What resource (documentation, tutorial, Stack Overflow) helped you overcome a specific obstacle?

**Tips for Writing This Section**

Be specific - "learned Prisma" is vague; "learned how to design efficient database schemas with Prisma's relation syntax" is concrete
Be honest - admitting challenges shows self-awareness
Focus on 1-3 major learnings rather than listing everything
Include one concrete challenge you overcame with your solution approach

**The goal is to show employers that you can:**

Identify what you don't know
Learn new technologies effectively
Solve problems independently
Reflect on your development process
