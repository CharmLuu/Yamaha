import { gql } from '@apollo/client';

export const FORGOT_PASSWORD = gql`
  mutation RequestPasswordResetEmail($email: String!) {
    requestPasswordResetEmail(
        email: $email
    )
  }
`;
