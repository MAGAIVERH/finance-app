import { CreateUserController } from './create-user'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    it('Should return 201 when creating a user succesfully', async () => {
        // ARANGE
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'carlos',
                last_name: 'magaiver',
                email: 'cm@gmail.com',
                password: '1234567',
            },
        }

        //ACT
        const result = await createUserController.execute(httpRequest)

        // ASSERT

        expect(result.statusCode).toBe(201)
        expect(result.body).toBe(httpRequest.body)
    })
})
