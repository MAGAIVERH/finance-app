import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(getUserbalanceRepository, getUserByIdRepository) {
        this.getUserbalanceRepository = getUserbalanceRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(userId) {
        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError()
        }

        const balance = await this.getUserbalanceRepository.execute(userId)
        return balance
    }
}
