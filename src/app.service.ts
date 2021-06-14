import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(name = 'World'): { greetings: string } {
    const capitalizedName = name.charAt(0).toLocaleUpperCase() + name.slice(1);

    return { greetings: `Hello ${capitalizedName}!` };
  }
}
