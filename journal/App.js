import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

import Navigator from './Navigator';

import { getToken } from './utils/util-login';

const authLink = setContext(async ( req, { headers } ) => {
    const token = await getToken();

    return {
        ...headers,
        headers: {
            authorization: token ? `Bearer ${token}` : null
        }
    };
});

const httpLink = new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cjiy4mzjl242e0157keehyxqf'
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
    link: ApolloLink.from([
        onError(( { graphQLErrors, networkError } ) => {
            if (graphQLErrors)
                graphQLErrors.map(( { message, locations, path } ) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    )
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        link
    ]),
    cache: new InMemoryCache()
});

export default class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Navigator />
            </ApolloProvider>
        );
    }
}
