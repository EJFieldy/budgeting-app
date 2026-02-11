# Budget and Expense Tracker

## Description
A modern budget and expense tracker that allows users to add, remove and edit transactions, monitor monthly spending, and set custom budgets for different expense categories. I built this project after using simple spreadsheets to track my personal finances, wanting a more elegant and visual representation. The app demonstrates what a dedicated web-based expense tracker could look like, with clear controls and an intuitive interface for managing personal finances. 

The app was designed for personal use, and so stores all financial data globally in a database as opposed to in individual user accounts. Adding user accounts, authentication and individual data storage would transform the app from a personal use demonstration to a production ready application. These changes are discussed in the 'Future Improvement' section below.

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

- Layout changes to a stacked list format, with each core feature separated into its own space.
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

## What I Learned

### Type Safety
Type safety was the first challenge that I encountered in this project. Accounting for potentially null or undefined values in the data from API calls, as well as ensuring a component's state type aligned with the expected object structure from my backend, were issues which regularly threw errors. Researching the TypeScript documentation alongside searching for solutions from other developers introduced me to the use of optional parameters inside of object types, which proved to be the solution. 

Furthermore, I would often get errors which occurred when TypeScript couldn't infer the type and defaulted to `any`. This is too broad of a type when in strict mode and requires an explicit type to be made. I frequently noticed this occurring when creating event handlers, such as the `handleSubmit` handler I made to override the default submission behaviour, and instead submit either a `PUT` or `POST` request when adding or editing transaction data. Searching for similar issues other developers had encountered taught me specific React.FormEvent types, which were required for such event handlers. In this case, the type `React.FormEvent<HTMLFormElement>` was appropriate for my `handleSubmit` event handler.

Alongside this, when creating types, I noticed I created multiple types that were very similar in object structure to each other. If I were to go back through this project, I would like to re-evaluate the types I used to reduce repetition. One potential solution would be to use baseline types which could then be extended to meet the specific requirements of a backend object structure. For example, a baseline `Category` type that can be extended to include `monthlyBudget` data.

### Backend Data Structure
Alongside type safety, creating backend API routes responsible for handling data aggregation was the next challenge. I needed to extract specific information from the database, aggregate these values and combine them into a data object to serve to my frontend. An example of this is fetching `Category` data from the database, mapping through it to calculate monthly totals for each category, and creating a new data object from this to return. Using Prisma queries in order to extract only the specific information required for these calculations aided significantly in solving this problem, alongside making my API routes more efficient overall. For example, using the `select` parameter in a `findMany` Prisma query, to only return the `amount` and `type` information from the transactions schema, followed by filtering the array by type and reducing to calculate separate totals for income and expense. From here, remaining balance can be calculated. Structuring my backend routes in this way allows me to handle all logic in the backend, freeing up my frontend to focus on styling and clearly displaying the information to the user.

Ensuring these data structures aligned with my frontend component state types felt inefficient with the route I took. I chose to design the data objects in the backend first, and create types around this as I constructed my React components. However, upon reviewing my backend I have noticed that there are multiple `get` requests in the `Categories` router specifically which return similar data. If I were to redo this section, I would look to combine these requests where possible, potentially returning a larger object with sections separated by different object keys.

### Data Synchronisation and Prop Drilling
Finally, synchronising my frontend with my backend to display updates in real-time required quite a bit of problem solving. The solution I came up with was to create a state variable called `refreshTrigger` with an initial value of zero in the highest common parent component, which in this case is the main `App.tsx` file. I also created the event handler `handleTransactionAdded` which took the previous value of `refreshTrigger` and called `setRefreshTrigger((prev) => prev + 1)`. These were passed down as props to child components responsible for displaying returned data from API call effects. The `refreshTrigger` was added to the dependency array for their effects, and `handleTransactionAdded` was passed as a callback function for `onClick` events. This allowed me to synchronise data refreshes across the app, always keeping up to date information displayed in real-time. 

However, a problem that I quickly noticed is how many intermediate components the state and event handler props needed to be passed down through, which led to me discovering a common pain point in React called prop drilling. Whilst I understand that this doesn't pose a problem for small applications such as mine, it proved to be a point of confusion and made my code feel inefficient. If I were to redo this project, I would look into the use of React's context API, or a third party state manager. These solutions are more commonly appropriate for larger and more complex applications, however I believe it is important to know about them as potential solutions.

# TODO:

- Create the future improvements subsection to round off the ReadME file.
