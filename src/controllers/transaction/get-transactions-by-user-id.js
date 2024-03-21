import { serverError, UserNotFoundResponse } from '../helpers.js'
import { UserNotFoundError } from '../../errors/user.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
} from '../helpers/validation.js'
import { ok } from '../helpers/http.js'

export class GetTransactionsByUserId {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId
            // verificar se o userId foi passado como parâmentro
            if (!userId) {
                return requiredFieldIsMissingResponse('userId')
            }

            // verificar se o userId é um id valido
            const userIdIsValid = checkIfIdIsValid(userId)
            if (!userIdIsValid) {
                return invalidIdResponse()
            }
            //chamar o use case
            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                })
            return ok(transactions)

            //retornar o http
        } catch (error) {
            console.error(error)

            if (error instanceof UserNotFoundError) {
                return UserNotFoundResponse
            }

            return serverError
        }
    }
}
