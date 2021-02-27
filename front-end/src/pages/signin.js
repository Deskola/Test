import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from '@apollo/client';




const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;



const SignIn = props => {
        // set the default state of the form
    const [values, setValues] = useState();

    // update the state when a user types in the form
    const onChange = event => {
        setValues({
        ...values,
        [event.target.name]: event.target.value
        });
    };
    useEffect(() => {    
    // update the document title
      document.title = 'Sign In â€” Notedly'; 
    });
    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
        // store the token
        localStorage.setItem('token', data.signIn);
        //update the local cache
			client.writeQuery({query: SIGNIN_USER, variables: { limit: 5, offset: 0 }, data: {isLoggedIn: true }});
        // redirect the user to the homepage
        props.history.push('/');
        document.location.reload()
        }
  });  
    return (   
        <div>
            <Wrapper>
      {/* Display the appropriate form header */}
      {props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
      {/* perform the mutation when a user submits the form */}
      <Form
        onSubmit={e => {
          e.preventDefault();
          signIn({
            variables: {
              ...values
            }
          });
        }}
      >        
        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </Form>
    </Wrapper>
    
        </div>  
    );
};
    
export default SignIn;