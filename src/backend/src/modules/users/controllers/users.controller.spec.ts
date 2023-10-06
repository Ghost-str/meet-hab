import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersServiceMock: UsersService;
  const mockUser = {
    id: 'd3f8fbc8-5aae-4671-ac04-3a82ee0b9a48',
    login: 'login',
    password: 'passwordP1[',
    email: 'some-email@example.com',
  };

  beforeEach(async () => {
    usersServiceMock = {
      create: jest.fn((user) => user),
    } as unknown as UsersService;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', async () => {
    await expect(controller.register(mockUser)).resolves.toEqual(mockUser);

    expect(usersServiceMock.create).toBeCalledTimes(1);
  });
});
