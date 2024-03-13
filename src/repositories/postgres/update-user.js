import { PostgresHelper } from '../../db/postgres/helper'

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        const updateFields = [] // [first_name = $1, last_name = $2 ...]
        const updateValues = [] // ['pedro', 'martins']

        Object.key(updateUserParams).forEach((key) => {
            updateFields.push(`${key} = ${updateValues.length + 1}`)
            updateValues.push(updateUserParams[key])
        })

        updateValues.push(userId)

        const updateQuery = `
        UPDATE users
        SET ${updateFields.join(' ,')}
        WHERE id = $${updateValues.length}
        RETURNING *
        `
        // 'first_name = $1' , last_name = $2,

        const updateUser = await PostgresHelper.query(updateQuery, updateValues)
        return updateUser[0]
    }
}
