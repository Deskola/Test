import React from 'react';
// import Apollo Client libraries
import { 
  ApolloClient, 
  ApolloProvider,
  createHttpLink, 
  InMemoryCache 
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { useQuery, gql } from '@apollo/client';


// import routes
import Pages from './pages';

// configure our API URI & cacheconst 
const uri = "http://localhost:4000/api"
console.log(uri)
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// check for a token and return the headers to the context
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});


// configure Apollo Client
const client = new ApolloClient({  
  link: authLink.concat(httpLink),  
  cache, 
  resolvers: {}, 
  connectToDevTools: true
});

const IS_LOGGED_IN = gql`
{
  isLoggedIn @client
}
`;

//check for a local token
const data = {
isLoggedIn: !!localStorage.getItem('token')
};

//write the cache data on initial load
client.writeQuery({query: IS_LOGGED_IN ,data, variables: { limit: 5, offset: 0 }, returnPartialData: true});
//cache.writeData({data});

//write the cache data after cahche is reset
client.onResetStore(() => cache.writeQuery({query: IS_LOGGED_IN, data }));


const App = () => {
  return (
    <div>
      <ApolloProvider client={client}>     
        <Pages />
      </ApolloProvider>

    </div>
  );
};


export default App;
