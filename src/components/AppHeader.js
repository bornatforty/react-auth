import React from 'react'
import {AppBar, Toolbar, Typography, Button, withStyles} from '@material-ui/core'
import LoginButton from './LoginButton'
import {Link} from 'react-router-dom'

//navbar component with links and login status

const styles = {
	flex: {
		flex: 1
	},
}

const AppHeader = ({ classes }) => (
	<AppBar position='static'>
		<Toolbar>
			<Typography variant='title' color='inherit'>
				My React App
			</Typography>
			<Button color='inherit' component={Link} to='/'>Home</Button>
			<Button color='inherit' component={Link} to='/posts'>Posts Manager</Button>
			<div className={classes.flex} />
			<LoginButton />
		</Toolbar>
	</AppBar>
	)

export default withStyles(styles)(AppHeader)