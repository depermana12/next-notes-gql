import { gql } from "@urql/next";

export const SignupMut = gql`
  mutation Mutation($input: AuthInput!) {
    register(input: $input) {
      id
      token
      username
      email
    }
  }
`;
