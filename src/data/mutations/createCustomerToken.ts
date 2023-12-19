import { gql } from '@apollo/client';

export const CREATE_CUSTOMER_TOKEN = gql`
  mutation CreateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;
