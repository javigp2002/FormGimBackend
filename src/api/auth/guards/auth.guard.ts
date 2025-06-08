import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthGuard implements CanActivate {
	oauthClient: OAuth2Client;
	constructor() {
		this.oauthClient = new OAuth2Client();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException('No token provided');
		}

		const ticket = await this.oauthClient.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID,
		});

		const payload = ticket.getPayload();

		if (!payload || payload.exp * 1000 < Date.now()) {
			throw new UnauthorizedException('Token has expired or is invalid');
		}

		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
