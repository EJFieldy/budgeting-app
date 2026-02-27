import type {
    TransactionPostData,
    PostValidationResponse,
} from "../types/transactionTypes";
import { TransactionType } from "@prisma/client";

export function validateTransactionPost(
    transaction: TransactionPostData,
): PostValidationResponse {
    if (
        transaction.amount == null ||
        transaction.amount <= 0 ||
        typeof transaction.amount !== "number" ||
        Number.isNaN(transaction.amount)
    ) {
        return { pass: false, error: "Amount must be a positive number" };
    }
    if (
        !transaction.type ||
        !Object.values(TransactionType).includes(transaction.type)
    ) {
        return {
            pass: false,
            error: "A type is required and must equal 'INCOME' or 'EXPENSE'",
        };
    }
    if (
        !transaction.categoryId ||
        transaction.categoryId <= 0 ||
        typeof transaction.categoryId !== "number"
    ) {
        return {
            pass: false,
            error: "The categoryId must be a positive number",
        };
    }

    return { pass: true };
}
