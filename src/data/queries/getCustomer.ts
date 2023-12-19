import { gql } from '@apollo/client';

// export interface GetCustomerDataType {
//     customer: CustomerType;
// }
//
// export interface CustomerType {
//     email: string;
//     firstName: string;
//     lastName: string;
// }

export const GET_CUSTOMER = gql`
  query GetCustomer {
    customer {
        firstname
        lastname
        email
        date_of_birth
        gender
    }
  }
`;
