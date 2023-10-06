import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;
  let UserServiceMock: UsersService;
  const APP_KEY = 'asdasdsadasdsadasdsadsadasdsa';
  const passwordHash =
    'P0QFZo2x7T8kwLiBWU8JQkQQpKlBJ8oB5Qdp+x3S8PnEmG8Quo/YgQ==';
  const password = 'passwordP1[';
  const mockUser = {
    id: 'd3f8fbc8-5aae-4671-ac04-3a82ee0b9a48',
    login: 'login',
    password: passwordHash,
    email: 'some-email@example.com',
  };

  beforeEach(async () => {
    UserServiceMock = {
      create: jest.fn((user) => user),
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
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => APP_KEY),
            getOrThrow: jest.fn(() => APP_KEY),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('return user and authKey when right credentials', async () => {
    await expect(
      service.login({ login: mockUser.login, password: password }),
    ).resolves.toStrictEqual({
      authKey: expect.anything(),
      user: mockUser,
    });
  });

  it('return null when wrong password', async () => {
    await expect(
      service.login({ login: mockUser.login, password: 'wrongPassword' }),
    ).resolves.toBe(null);
  });

  it('hash user password when register user', async () => {
    await expect(
      service.register({ ...mockUser, password }),
    ).resolves.toStrictEqual({
      authKey: expect.anything(),
      user: { ...mockUser, password: passwordHash },
    });
  });
});
