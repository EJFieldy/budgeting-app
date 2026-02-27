import { TransactionPostData } from "../types/transactionTypes";
import { validateTransactionPost } from "./validateTransactionPost";

describe("Validate Post Transaction Data", () => {
    test("Returns false when the amount is missing", () => {
        const mockMissingAmount: Partial<TransactionPostData> = {
            type: "EXPENSE",
            categoryId: 1,
        };
        // @ts-expect-error: missing one argument from expected type
        expect(validateTransactionPost(mockMissingAmount)).toEqual({
            pass: false,
            error: "Amount must be a positive number",
        });
    });

    test("Returns false when the amount is negative", () => {
        const mockNegativeAmount: TransactionPostData = {
            amount: -100,
            type: "EXPENSE",
            categoryId: 1,
        };

        expect(validateTransactionPost(mockNegativeAmount)).toEqual({
            pass: false,
            error: "Amount must be a positive number",
        });
    });

    test("Returns false when the amount is not a number", () => {
        const mockStringAmount = {
            amount: "100",
            type: "EXPENSE",
            categoryId: 1,
        };

        //@ts-expect-error: expects amount as a number, but it's passed here as a string
        expect(validateTransactionPost(mockStringAmount)).toEqual({
            pass: false,
            error: "Amount must be a positive number",
        });
    });

    test("Returns false when type is missing", () => {
        const mockTypeMissing: Partial<TransactionPostData> = {
            amount: 100,
            categoryId: 1,
        };

        //@ts-expect-error: missing one argument from expected type
        expect(validateTransactionPost(mockTypeMissing)).toEqual({
            pass: false,
            error: "A type is required and must equal 'INCOME' or 'EXPENSE'",
        });
    });

    test("Returns false when type is not 'INCOME' or 'EXPENSE' explicitly", () => {
        const mockIncorrectType = {
            amount: 100,
            type: "income",
            categoryId: 1,
        };

        //@ts-expect-error: type value passed doesn't match the expected explicit type value
        expect(validateTransactionPost(mockIncorrectType)).toEqual({
            pass: false,
            error: "A type is required and must equal 'INCOME' or 'EXPENSE'",
        });
    });

    test("Returns false when categoryId is missing", () => {
        const mockCategoryIdMissing: Partial<TransactionPostData> = {
            amount: 100,
            type: "EXPENSE",
        };

        //@ts-expect-error: missing one argmuent from expected type
        expect(validateTransactionPost(mockCategoryIdMissing)).toEqual({
            pass: false,
            error: "The categoryId must be a positive number",
        });
    });

    test("Returns false when categoryId is negative", () => {
        const mockNegativeCategoryId: TransactionPostData = {
            amount: 100,
            type: "EXPENSE",
            categoryId: -1,
        };

        expect(validateTransactionPost(mockNegativeCategoryId)).toEqual({
            pass: false,
            error: "The categoryId must be a positive number",
        });
    });

    test("Returns false when categoryId is not a number", () => {
        const mockStringCategoryId = {
            amount: 100,
            type: "EXPENSE",
            categoryId: "1",
        };

        //@ts-expect-error: expects categoryId to be a number, here it's passed as a string
        expect(validateTransactionPost(mockStringCategoryId)).toEqual({
            pass: false,
            error: "The categoryId must be a positive number",
        });
    });

    test("Returns true when validation checks are passed", () => {
        const mockValidData: TransactionPostData = {
            amount: 100,
            type: "EXPENSE",
            categoryId: 1,
        };

        expect(validateTransactionPost(mockValidData)).toEqual({
            pass: true,
        });
    });
});
