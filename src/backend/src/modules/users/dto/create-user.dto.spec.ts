import validationPipeHelper from '../../../../test/utils/validationPipeHelper';
import omitEachKeyHelper from '../../../../test/utils/omitEachKeyHelper';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  const validator = validationPipeHelper();

  const mockUser = {
    id: 'd3f8fbc8-5aae-4671-ac04-3a82ee0b9a48',
    login: 'login',
    password: 'passwordP1[',
    email: 'some-email@example.com',
  };

  it('correctly validate mockUser', async () => {
    await expect(validator(mockUser, CreateUserDto)).resolves.toMatchObject(
      mockUser,
    );
  });

  test.each(omitEachKeyHelper(mockUser))(
    'it throw validation error for key %c%s if field not exists',
    async (object, key) => {
      await expect(validator(object, CreateUserDto)).rejects.toEqual(
        expect.arrayContaining([expect.objectContaining({ property: key })]),
      );
    },
  );
});
