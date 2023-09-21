export const BaseUrl = process.env.HOST;
export const IsDev = process.env.NODE_ENV !== 'production';
export const NoReplyEmailAddress = process.env.NO_REPLY_EMAIL_ADDRESS || '';
export const SmtpPort = +(process.env.SMTP_PORT || '25');
export const SmtpPw = process.env.SMTP_PW;
export const SmtpServer = process.env.SMTP_SERVER;
export const SmtpUsername = process.env.SMTP_USERNAME;

export const ApiUrl = '/api/v0';
export const AppName = 'InteractiveFiction';
export const CookieName = AppName;
export const DefaultToastMsgDelay = 4000;
export const ISODateStringLength = 24;
export const MongoIdLength = 24;
export const PasswordMaxLength = 128;
export const PasswordMinLength = 6;
export const PasswordSaltLength = 10;
export const UsernameMaxLength = 24;
export const UsernameMinLength = 3;

export const AuthUser_tokensCookieName = `${CookieName}.AuthUserTokens`;
export const AuthUserCookieName = `${CookieName}.AuthUser`;

export
const BaseReq: RequestInit = {
	credentials: 'include',
	headers: {
		Accept: 'application/json, text/plain, */*',
		'Content-Type': 'application/json',
	},
} as const;

export
const DbCollections = {
	Users: 'users',
	UsersMeta: 'users-meta',
	UserProfiles: 'user-profiles',
	UserOneClickLinkKeys: 'user-one-click-link-keys',
	SentEmails: 'sent-emails',
} as const;

export
const UserRoles = {
	Admin: 'admin',
	User: 'user',
} as const;

export
const NotLoggedInErrMsg = {
	ok: false,
	msg: 'Not logged in',
};

export
const AuthProviders = {
	OneClick: 'one-click',
	Creds: 'creds',
} as const;
