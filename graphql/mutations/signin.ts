import { gql } from "@urql/next";

export const SigninMut = gql`
  mutation Mutation($input: SignIn!) {
    login(input: $input) {
      id
      token
      username
      email
    }
  }
`;
