import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function AppNavbar({
    signedIn = false,
    onLogout,
    onToCart,
    onHomeClicked
}) {
    return (
        <Navbar bg="light" expand="lg">
            <div style={{ display: 'flex', justifyContent: "space-between", width: '100%' }}>
                <div style={{ display: 'flex' }}>
                    <Navbar.Brand onClick={onHomeClicked}>Supa Shopping</Navbar.Brand>
                    {signedIn ? <Nav.Link onClick={onToCart}>Cart</Nav.Link> : null}
                </div>



                <div>
                    {signedIn ?
                        <Form inline>
                            <Button onClick={onLogout} variant="outline-success">Logout</Button>
                        </Form>
                        :
                        null
                    }


                </div>



            </div>

        </Navbar>
    )
}
