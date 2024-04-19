import { UserNotFoundError } from '../../errors/user.js'

export class CreateTransactionUseCase {
    constructor(
        createTransactionRepository,
        getUseByIdRepository,
        idGeneratorAdapter,
    ) {
        this.createTransactionRepository = createTransactionRepository
        this.getUseByIdRepository = getUseByIdRepository
        this.idGeneratorAdapter = new idGeneratorAdapter()
    }

    async execute(createTransactionParams) {
        // Validar se usuario existe
        const userId = createTransactionParams.user_id

        const user = await this.getUseByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const transactionId = this.idGeneratorAdapter.execute()

        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        })

        return transaction
    }
}
