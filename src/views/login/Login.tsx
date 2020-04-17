import React from "react";
import { Form } from "../_shared/Form";
import { Input } from "../_shared/Input";
import Button from "@material-ui/core/Button";
import "./Login.css";
import { LOGIN } from "../../graphql-requests/mutations";
import { useMutation } from "@apollo/react-hooks";
//import {TextField}from "@material-ui/core/";

interface LoginFormData {
   email: string;
   password: string;
}

export const Login = (props: LoginFormData | any) => {
   console.log(props);
   const [login] = useMutation(LOGIN);
   const onSubmit = ({ email, password }: LoginFormData) => {
      login({ variables: { email: email, password: password } })
         .then(res => {
            console.log(res.data);
            localStorage.setItem("token", res.data.login.token);
            localStorage.setItem("username", res.data.login.user.username);
            localStorage.setItem("user_id", res.data.login.user.id);
         })
         .then(data => {
            props.history.push("/home");
            console.log("Success: ");
         })
         .catch(err => err.message);
   };

   // if (loading) return <p>Loading...</p>;

   return (
      <>
         <Form className="login-form" onSubmit={onSubmit}>
            <Input name="email" placeholder="Email" />
            <Input
               name="password"
               placeholder="Password"
               autoComplete="current-password"
               type="password"
               minLength={9}
            />
            <Button
               variant="contained"
               color="primary"
               type="submit"
               value="submit"
            >
               Submit
            </Button>
         </Form>
      </>
   );
};
