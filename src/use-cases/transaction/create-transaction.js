import { UserNotFoundError } from '../../errors/user.js'
import { v4 as uuidv4 } from 'uuid'

export class CreateTransactionUseCase {
    constructor(createTransactionRepository, getUseByIdRepository) {
        this.createTransactionRepository = createTransactionRepository
        this.getUseByIdRepository = getUseByIdRepository
    }

    async execute(createTransactionParams) {
        // Validar se usuario existe
        const userId = createTransactionParams.userId

        const user = await this.getUseByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const transactionId = uuidv4()

        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        })

        return transaction
    }
}
