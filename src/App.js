import { Route, Switch, useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import './App.css';
import Cart from './Cart/Cart';
import Listing from './Listing/Listing';
import Login from './Login/Login';
import { SuperBaseContext } from './superbaseContext'
import Container from 'react-bootstrap/Container';
import AppNavbar from './AppNavbar/AppNavbar';

function App() {


  const superbase = useContext(SuperBaseContext);
  const [user, setUser] = useState(superbase.auth.session());
  const history = useHistory()

  console.log("the user ", user);
  useEffect(() => {
    setTimeout(() => setUser(superbase.auth.session()), 300)
  }, [])

  useEffect(() => {


    const { data } = superbase.auth.onAuthStateChange((_user, session) => {


      setUser(session)

      return data;
    });

  }, [])

  return (
    <>
      <AppNavbar
        signedIn={!!user}
        onLogout={() => superbase.auth.signOut()}
        onToCart={() => history.push("/cart")}
        onHomeClicked={() => history.replace("/")}
      />
      <Container>


        <Switch>
          {!user ? (
            <>
              <Route path="" component={Login} />
            </>
          ) :
            (
              <>
                <Route path="/cart" render={() => <Cart user={user.user} />} />
                <Route path="/" exact render={() => <Listing user={user.user} />} />
              </>
            )
          }
        </Switch>
      </Container>
    </>
  );

}

export default App;
