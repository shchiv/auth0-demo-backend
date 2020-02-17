import {
  Injectable,
  HttpService,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';

export interface AuthReponse {
  access_token: string;
  expires_in: number;
}

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}
  private logger = new Logger('AuthService');

  async getJWToken(code: string): Promise<AuthReponse> {
    try {
      const resp = await this.httpService
        .post(process.env.AUTH0_URL, {
          grant_type: 'authorization_code',
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          code: code,
          redirect_uri: process.env.AUTH0_REDIRECT_URL,
        })
        .toPromise();

      if (resp.data) {
        return {
          access_token: resp.data.access_token,
          expires_in: resp.data.expires_in,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
