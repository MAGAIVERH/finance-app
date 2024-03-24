import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(getUserbalanceRepository, getUserByIdRepository) {
        this.getUserbalanceRepository = getUserbalanceRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            throw new UserNotFoundError()
        }

        const balance = await this.getUserbalanceRepository.execute(
            params.userId,
        )
        return balance
    }
}
