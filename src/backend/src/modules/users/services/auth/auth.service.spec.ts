import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let UserServiceMock: UsersService;

  const mockUser = {
    id: 'd3f8fbc8-5aae-4671-ac04-3a82ee0b9a48',
    login: 'login',
    password: 'passwordP1[',
    email: 'some-email@example.com',
  };

  beforeEach(async () => {
    UserServiceMock = {
      create: jest.fn(),
      findByLogin: jest.fn((login) => {
        if (mockUser.login === login) {
          return mockUser;
        }
        return null;
      }),
    } as unknown as UsersService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: UserServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('it return user when right credentials', async () => {
    await expect(
      service.login({ login: mockUser.login, password: mockUser.password }),
    ).resolves.toStrictEqual(mockUser);
  });

  it('it return null when wrong password', async () => {
    await expect(
      service.login({ login: mockUser.login, password: 'wrongPassword' }),
    ).resolves.toBe(null);
  });
});
