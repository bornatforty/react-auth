import React, { Fragment } from 'react'
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
      <Home />
    </main>
  </Fragment>
)

export default withStyles(styles)(App)
//JSS in material-ui replaces traditional CSS