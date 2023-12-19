import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import {loadCustomerToken} from "./utils/storage";
import {IS_LOGGED_IN} from "./data/queries/isLoggedIn";
import { setContext } from '@apollo/client/link/context';

let _client: ApolloClient<any>;

export async function getApolloClient(): Promise<ApolloClient<any>> {
    if (_client) {
        return _client;
    }

    const customerToken = await loadCustomerToken();
    const cache = new InMemoryCache();

    if (customerToken !== null) {
        cache.writeQuery({
            query: IS_LOGGED_IN,
            data: {
                isLoggedIn: true,
            },
        });
    }

    const httpLink = createHttpLink({
        uri: `https://demo.ecommage.com/graphql`,
    })

    const authLink = setContext(async (_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = await loadCustomerToken();
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token !== null ? `Bearer ${token}` : '',
            },
        };
    })

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache,
    });

    _client = client;

    return client;
}