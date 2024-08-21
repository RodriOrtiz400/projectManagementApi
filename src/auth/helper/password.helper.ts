import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  saltRounds = 10;

  async hashData(pwd: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(pwd, salt);
  }
}
