import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Starting seed...");

    const categoryNames = [
        "Groceries",
        "Entertainment",
        "Bills",
        "Dining Out",
        "Healthcare",
        "Transport",
        "Shopping",
        "Other",
    ];

    const categoryMap: Record<string, number> = {};

    for (const name of categoryNames) {
        const category = await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        categoryMap[name] = category.id;
    }

    console.log(`Successfully seeded ${categoryNames.length} categories`);

    function getCategoryId(
        categoryMap: Record<string, number>,
        name: string
    ): number {
        const id = categoryMap[name];
        if (id === undefined) {
            throw new Error(`Category ${name} not found in map`);
        }
        return id;
    }

    const transactions = [
        {
            amount: 52.3,
            type: "EXPENSE" as const,
            categoryId: getCategoryId(categoryMap, "Groceries"),
            description: "Weekly food shop at Lidl",
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
        {
            amount: 2500.0,
            type: "INCOME" as const,
            categoryId: getCategoryId(categoryMap, "Other"),
            description: "Monthly salary",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
            amount: 45.67,
            type: "EXPENSE" as const,
            categoryId: getCategoryId(categoryMap, "Bills"),
            description: "Electricity bill",
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
            amount: 23.4,
            type: "EXPENSE" as const,
            categoryId: getCategoryId(categoryMap, "Dining Out"),
            description: "Lunch at cafe",
            date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        },
        {
            amount: 12.5,
            type: "EXPENSE" as const,
            categoryId: getCategoryId(categoryMap, "Transport"),
            description: "Bus fare to work",
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
    ];

    await prisma.transaction.createMany({
        data: transactions,
    });

    console.log(`Successfully seeded ${transactions.length} transactions`);
    console.log("Seeding completed");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
