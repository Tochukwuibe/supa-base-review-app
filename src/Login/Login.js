import React, { useState, useContext } from 'react'
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import { SuperBaseContext } from '../superbaseContext';

export default function Login() {

    const superbase = useContext(SuperBaseContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onSignup = () => {
        superbase.auth.signUp({
            email,
            password
        })
    }

    const onLogin = async () => {
    
        try {
            
             await superbase.auth.signIn({
                email,
                password
            })

           
        } catch (e) {
            console.log("the error ", e);
        }

    }


    return (
        <div className="Login">
            <Container>
                <div className="inputs">
                    <h1>SupaShopping</h1>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            value={password}
                        />
                    </InputGroup>
                </div>
                <div className="login-button">
                    <Button onClick={onLogin} className="mx-auto">
                        Login
                </Button>
                    <Button onClick={onSignup} className="mx-auto mt-3">
                        SignUp
                    </Button>
                </div>

            </Container>
        </div>
    )
}
