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
                first_name: 'irina',
                last_name: 'ucrania',
                email: 'tallin@gmail.com',
                password: '1234567',
            },
        }

        //ACT
        const result = await createUserController.execute(httpRequest)

        // ASSERT

        expect(result.statusCode).toBe(201)
        expect(result.body).toEqual(httpRequest.body)
    })

    it('should return 400 if first_name is not provided', async () => {
        // ARRANGE
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                last_name: 'ucrania',
                email: 'tallin@gmail.com',
                password: '1234567',
            },
        }

        // ACT
        const result = await createUserController.execute(httpRequest)

        // ASSERT
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if last_name is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'irina',

                email: 'tallin@gmail.com',
                password: '1234567',
            },
        }

        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 201 if email is valid', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'irina',
                last_name: 'ucrania',
                email: 'tallin@gmail.com',
                password: '1234567',
            },
        }
        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(201)
    })

    it('should return 400 if email is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'irina',
                last_name: 'ucrania',

                password: '1234567',
            },
        }
        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not valid', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'irina',
                last_name: 'ucrania',
                email: 'email_invalid',
                password: '1234567',
            },
        }
        // act
        const result = await createUserController.execute(httpRequest)

        // assert

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if password is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'irina',
                last_name: 'ucrania',
                email: 'tallin@gmail.com',
            },
        }
        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if password is less than 6 characters', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'irina',
                last_name: 'ucrania',
                email: 'tallin@gmail.com',
                password: '1234',
            },
        }

        // act
        const result = await createUserController.execute(httpRequest)

        // assert

        expect(result.statusCode).toBe(400)
    })

    it('should call CreateUserUseCase with correct params', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'irina',
                last_name: 'ucrania',
                email: 'tallin@gmail.com',
                password: '1234567',
            },
        }
        const executeSpy = jest.spyOn(createUserUseCase, 'execute')

        // act
        await createUserController.execute(httpRequest)

        // assetr
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
        expect(executeSpy).toHaveBeenCalledTimes(1)
    })
})
