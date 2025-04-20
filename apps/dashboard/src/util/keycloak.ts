import KcAdminClient from '@keycloak/keycloak-admin-client';

const keycloakAdminClientSingleton = () => {
	const client = new KcAdminClient({
		baseUrl: process.env.KEYCLOAK_URL,
		realmName: process.env.KEYCLOAK_REALM,
	});

	client
		.auth({
			grantType: 'client_credentials',
			clientId: process.env.KEYCLOAK_CLIENTID || '',
			clientSecret: process.env.KEYCLOAK_CLIENTSECRET,
		})
		.then(() => {})
		.catch((err) => {
			console.error('Keycloak client authentication failed:', err);
		});
	return client;
};

declare const globalThis: {
	keycloakAdminGlobal: ReturnType<typeof keycloakAdminClientSingleton>;
} & typeof global;

const keycloakAdmin = globalThis.keycloakAdminGlobal ?? keycloakAdminClientSingleton();

export default keycloakAdmin;

if (process.env.NODE_ENV !== 'production') globalThis.keycloakAdminGlobal = keycloakAdmin;
