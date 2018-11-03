import React, { Fragment } from 'react'
import {Route} from 'react-router-dom'
import {ImplicitCallback} from '@okta/okta-react'
import {CssBaseline, withStyles} from '@material-ui/core'
import AppHeader from './components/AppHeader'
import Home from './pages/Home'

//replace css files with these default settings to normalize the app

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      padding: 2 * theme.spacing.unit,
    },
  },
})

const App = ({ classes}) => (
  <Fragment>
    <CssBaseline />
    <AppHeader />
    <main className={classes.main}>
      <Route exact path="/" component={Home} />
      <Route path="/implicit/callback" component={ImplicitCallback} />
    </main>
  </Fragment>
)

export default withStyles(styles)(App)
//JSS in material-ui replaces traditional CSS