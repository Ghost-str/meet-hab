import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  const mockUser = { login: 'login', password: 'password' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(({ password }) => {
              return password === mockUser.password ? mockUser : null;
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('it throw error when wrong password', async () => {
    const value = controller.login({ ...mockUser, password: 'wrong password' });

    await expect(value).rejects.toThrow(UnauthorizedException);
  });

  it('it login with correct password', async () => {
    const value = controller.login({ ...mockUser });

    await expect(value).resolves.toMatchObject(mockUser);
  });
});
