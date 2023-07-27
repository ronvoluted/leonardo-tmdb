namespace Auth {
  export type SignUpError = 'email-exists' | 'username-exists';
  export type SignUpSuccess = 'success';
  export type SignUpSearchParam = `signup=${SignUpError | SignUpSuccess}`;
}
