import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DEFAULT_ROLE, UserStatus } from '../../constants';

describe('UsersService', () => {
  let service: UsersService;
  let UserRepositoryProvider: Repository<User>;
  const mockUser = {
    id: 'd3f8fbc8-5aae-4671-ac04-3a82ee0b9a48',
    login: 'login',
    password: 'passwordP1[',
    email: 'some-email@example.com',
  };

  beforeEach(async () => {
    UserRepositoryProvider = {
      save: jest.fn((user) => user),
      findOneBy: jest.fn(({ login, status }) => {
        if (mockUser.login === login && UserStatus.Active === status) {
          return {
            ...mockUser,
            role: DEFAULT_ROLE,
            status: UserStatus.Active,
          };
        }
        return null;
      }),
    } as unknown as Repository<User>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: UserRepositoryProvider,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('it properly save user', async () => {
    await expect(service.create({ ...mockUser })).resolves.toStrictEqual({
      ...mockUser,
      role: DEFAULT_ROLE,
      status: UserStatus.Active,
    });
  });

  it('it properly search user', async () => {
    await expect(service.findByLogin('login')).resolves.toStrictEqual({
      ...mockUser,
      role: DEFAULT_ROLE,
      status: UserStatus.Active,
    });
  });
});
