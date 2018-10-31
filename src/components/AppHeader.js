import React, { Component } from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core'

//navbar component with links and login status

const AppHeader = () => (
	<AppBar position='static'>
		<Toolbar>
			<Typography variant='title' color='inherit'>
				My React App
			</Typography>
		</Toolbar>
	</AppBar>
	)

export default AppHeader