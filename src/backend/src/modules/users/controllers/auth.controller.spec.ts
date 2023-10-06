import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: AuthService;
  const mockCredentials = { login: 'login', password: 'password' };
  const mockUser = {
    id: 'd3f8fbc8-5aae-4671-ac04-3a82ee0b9a48',
    login: 'login',
    password: 'passwordP1[',
    email: 'some-email@example.com',
  };

  beforeEach(async () => {
    mockAuthService = {
      login: jest.fn(({ password }) => {
        return password === mockCredentials.password ? mockCredentials : null;
      }),
      register: jest.fn((user) => user),
    } as unknown as AuthService;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('it throw error when wrong password', async () => {
    const value = controller.login({
      ...mockCredentials,
      password: 'wrong password',
    });

    await expect(value).rejects.toThrow(UnauthorizedException);
  });

  it('it login with correct password', async () => {
    const value = controller.login({ ...mockCredentials });

    await expect(value).resolves.toMatchObject(mockCredentials);
  });

  it('it call register method of AuthService', async () => {
    await expect(controller.register(mockUser)).resolves.toEqual(mockUser);
    expect(mockAuthService.register).toBeCalledTimes(1);
  });
});
