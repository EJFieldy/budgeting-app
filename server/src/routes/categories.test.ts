import request from "supertest";
import app from "../app"
import { prismaMock } from "../singleton"
import { Decimal } from "@prisma/client/runtime/library";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

describe("GET /api/categories", () => {
	test("Returns status code 200 with an array of categories", async () => {
		const mockCategoryData = [
			{
				id: 1,
				name: "Groceries",
				monthlyBudget: new Decimal(300),
			},
			{
				id: 2,
				name: "Travel",
				monthlyBudget: new Decimal(200),
			},
		]

		prismaMock.category.findMany.mockResolvedValueOnce(mockCategoryData)

		const res = await request(app).get("/api/categories")
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual([
			{
				id: 1,
				name: "Groceries",
				monthlyBudget: "300",
			},
			{
				id: 2,
				name: "Travel",
				monthlyBudget: "200",
			},
		])
	})
});

describe("POST /api/categories", () => {
	test("Returns status code 201 with valid post data", async () => {
		const mockPostData = {
			id: 3,
			name: "Health",
			monthlyBudget: new Decimal(400),
		}

		prismaMock.category.create.mockResolvedValueOnce(mockPostData)

		const res = await request(app).post("/api/categories").send({ name: "Health" })
		expect(res.statusCode).toBe(201)
		expect(res.body).toEqual({
			id: 3,
			name: "Health",
			monthlyBudget: "400",
		})
	})

	test("Returns status code 400 and error message when name is omitted", async () => {
		const res = await request(app).post("/api/categories").send({})
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual({ error: "Name of category required" })
	})
})

describe("DELETE /api/categories/:id", () => {
	test("Returns status code 400 when an invalid ID is provided", async () => {
		const res = await request(app).delete("/api/categories/twenty")
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual({ error: "Invalid Id parameter" });
	})

	test("Returns status code 204 on successful deletion", async () => {
		const mockDeleteData = {
			id: 5,
			name: "Travel",
			monthlyBudget: new Decimal(250),
		}

		prismaMock.category.delete.mockResolvedValueOnce(mockDeleteData)

		const res = await request(app).delete("/api/categories/5")
		expect(res.statusCode).toBe(204);
	})

	test("Returns status code 404 if category does not exist", async () => {

		prismaMock.category.delete.mockRejectedValueOnce(
			new PrismaClientKnownRequestError(
				"An operation failed because it depends on one or more records that were required but not found. No record was found for a delete.",
				{ code: "P2025", clientVersion: "6.19.0", meta: { modelName: "Category", cause: "No record was found for a delete." } }
			)
		)

		const res = await request(app).delete("/api/categories/7")
		expect(res.statusCode).toBe(404)
		expect(res.body).toEqual({ error: "Category not found" })
	})

	test("Returns status code 400 if category has existing transaction", async () => {
		prismaMock.transaction.count.mockResolvedValueOnce(5);

		const res = await request(app).delete("/api/categories/2");
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual({ error: "Cannot delete category with existing transactions", suggestion: "Reassign transactions to other categories before deletion" })
	})
})

describe("DELETE /api/categories/budgets/:id", () => {
	test("Returns status code 400 when an invalid id is passed", async () => {
		const res = await request(app).delete("/api/categories/budgets/two");
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual({ error: "Invalid Id parameter" })
	})

	test("Returns status code 200 with confirmation of the reset budget on success", async () => {
		const mockBudgetReset = {
			id: 2,
			name: "Groceries",
			monthlyBudget: new Decimal(0)
		}

		prismaMock.category.update.mockResolvedValueOnce(mockBudgetReset);

		const res = await request(app).delete("/api/categories/budgets/2");
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({
			id: 2,
			name: "Groceries",
			monthlyBudget: "0"
		})
	})

	test("Returns status code 404 when the category does not exist", async () => {

		prismaMock.category.update.mockRejectedValueOnce(
			new PrismaClientKnownRequestError(
				"An operation failed because it depends on one or more records that were required but not found. No record was found for a delete.",
				{ code: "P2025", clientVersion: "6.19.0", meta: { modelName: "Category", cause: "No record was found for a delete." } }
			)
		)

		const res = await request(app).delete("/api/categories/budgets/2");
		expect(res.statusCode).toBe(404);
		expect(res.body).toEqual({ error: "Category budget not found" })
	})
})

describe("PUT /api/categories/budgets/:id", () => {
	test("Returns status code 400 when an invalid id is provided", async () => {
		const res = await request(app).put("/api/categories/budgets/two");
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual({ error: "Invalid Id parameter" })
	})

	test("Returns status code 400 when no budget data is provided", async () => {
		const res = await request(app).put("/api/categories/budgets/2").send({});
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual({ error: "Amount for monthly budget required" });
	})

	test("Returns status code 200 on successful update", async () => {
		const mockPutData = {
			id: 2,
			name: "Groceries",
			monthlyBudget: new Decimal(250),
		}

		prismaMock.category.update.mockResolvedValueOnce(mockPutData);

		const res = await request(app).put("/api/categories/budgets/2").send({ monthlyBudget: 350 })

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({
			id: 2,
			name: "Groceries",
			monthlyBudget: "250",
		})
	})

	test("Returns status code 404 when a P2025 prisma error code is found", async () => {

		prismaMock.category.update.mockRejectedValueOnce(
			new PrismaClientKnownRequestError(
				"An operation failed because it depends on one or more records that were required but not found. No record was found for a delete.",
				{ code: "P2025", clientVersion: "6.19.0", meta: { modelName: "Category", cause: "No record was found for a delete." } }

			)
		)

		const res = await request(app).put("/api/categories/budgets/2").send({ monthlyBudget: 250 })
		expect(res.statusCode).toBe(404);
		expect(res.body).toEqual({ error: "Category not found" })
	})
})
