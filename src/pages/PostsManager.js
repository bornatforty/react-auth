import React, {Component, Fragment} from 'react'
import {withAuth} from '@okta/okta-react'
import {withRouter, Route, Redirect, Link} from 'react-router-dom'
import {withStyles, Typography, Button, IconButton, Paper, List, ListItem, ListItemText, ListItemSecondaryAction} from '@material-ui/core'
import {Delete as DeleteIcon, Add as AddIcon} from '@material-ui/icons'
import moment from 'moment' //user-friendly strings for time
import {find, orderBy} from 'lodash'
import {compose} from 'recompose' //wrap multiple HOCs
import PostEditor from '../components/PostEditor'

const styles = theme => ({
	posts: {
		marginTop: 2 * theme.spacing.unit
	},
	fab: {
		position: 'absolute',
		bottom: 3 * theme.spacing.unit,
		right: 3 * theme.spacing.unit,
		[theme.breakpoints.down('xs')]: {
			bottom: 2 * theme.spacing.unit,
			right: 2 * theme.spacing.unit
		}
	}
})

const API = process.env.REACT_APP_API || 'http://localhost:3001' //option to run on another server. default to port 3001

class PostsManager extends Component {
	state = {
		loading: true,
		posts: []
	} //show loading until data appears

	componentDidMount() {
		this.getPosts()
	}

	async fetch(method, endpoint, body) {
		try {
			const response = await fetch(`${API}${endpoint}`, {
				method,
				body: body && JSON.stringify(body),
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
					authorization: `Bearer ${await this.props.auth.getAccessToken()}`,
				}
			})
			return await response.json()
		}
		catch (error) {
			console.error(error)
		}
	}

	async getPosts() {
		this.setState({
			loading: false,
			posts: await this.fetch('get', '/posts')
		}) //remove the loading and fetch posts
	}

	savePost = async (post) => {
		if (post.id) {
			await this.fetch('put', `/posts/${post.id}`, post)
		}
		else {
			await this.fetch('post', '/posts', post )
		} //modify existing posts or create new ones

		this.props.history.goBack()
		this.getPosts() //retrieve updated posts
	}

	async deletePost(post) {
		if(window.confirm(`Are you sure you want to delete "${post.title}"`)) {
			await this.fetch('delete', `/posts/${post.id}`)
			this.getPosts() //retrieve updated posts
		}
	}

renderPostEditor = ({match: {params: {id}}}) => {
	if (this.state.loading) return null //no rendering during loading

	const post = find(this.state.posts, {id: Number(id)})

	if (!post && id !== 'new') return (<Redirect to='/posts' />)

	return (
		<PostEditor post={post}
					onSave={this.savePost} />)
}

render() {
	const {classes} = this.props

return (
	<Fragment>
		<Typography variant="display1">
			Posts Manager
		</Typography>
		{this.state.posts.length > 0 ? (
			<Paper elevation={1} className={classes.posts}>
				<List>
					{orderBy(this.state.posts, ['updatedAt', 'title'], ['desc', 'asc']).map(post => (
						<ListItem key={post.id} button component={Link} to={`/posts/${post.id}`}>
							<ListItemText
								primary={post.title}
								secondary={post.updatedAt && `Updated ${moment(post.updatedAt).fromNow()}`}
							/>
							<ListItemSecondaryAction>
								<IconButton onClick={() => this.deletePost(post)} color='inherit'>
									<DeleteIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						))}
				</List>
			</Paper>
		) : (
		!this.state.loading && 
			<Typography variant="subheading">
				No posts to display
			</Typography>
			)}
		<Button variant='fab'
				color='secondary'
				aria-label='add'
				className={classes.fab}
				component={Link}
				to='/posts/new'
		>
			<AddIcon />
		</Button>
		<Route exact path='/posts/:id' render={this.renderPostEditor} />
	</Fragment>
	)
}}

export default compose(withAuth,withRouter,withStyles(styles))(PostsManager)