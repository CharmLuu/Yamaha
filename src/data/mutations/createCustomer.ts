import { gql } from '@apollo/client';

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $date_of_birth: String!
    $gender: Int!
    $is_subscribed: Boolean!
  ) {
    createCustomerV2(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
        date_of_birth: $date_of_birth
        gender: $gender
        is_subscribed: $is_subscribed
      }
    ) {
      customer {
        firstname
        lastname
        email
        is_subscribed
        date_of_birth
        gender
      }
    }
  }
`;