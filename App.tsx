import { Text } from 'react-native';
import RootNavigation from "./src/navigation/RootNavigation";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {useState, useEffect} from "react";
import {getApolloClient} from "./src/client";
import FlashMessage from 'react-native-flash-message';

export default function App() {
  const [client, setClient] = useState<ApolloClient<any>>();
    useEffect(() => {
      getApolloClient()
          .then(setClient)
          .catch(e => console.log(e));
    }, [])

    if(client){
      return (
          <ApolloProvider client={client}>
            <RootNavigation />
            <FlashMessage position="top" />
          </ApolloProvider>
      )
    }
    return  <Text>Loading...</Text>;
}

if (__DEV__) {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

