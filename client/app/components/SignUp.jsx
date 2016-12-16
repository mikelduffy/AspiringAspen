 import React, { PropTypes } from 'react';
 import ReactDOM from 'react-DOM';

 class SignUp extends React.Component {
 	constructor(props) {
 		super(props);

 		this.state = {

 		}
 	}
	componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    TweenMax.fromTo('.waiting', 0.7, {y: -100, opacity: 0}, {y: 0, opacity: 1, ease: Expo.easeOut});
  }

  componentWillUnmount() {
    const el = ReactDOM.findDOMNode(this);
    TweenMax.fromTo('.waiting', 0.7, {y: 0, opacity: 1}, {y: -100, opacity: 0, ease: Expo.easeOut});
  }

  render () {
  	return (
  		<div className='cover signinup z-depth-5'>
  			<h3 className='center-align'> Sign In </h3>
  			<form>
  				Username
  				<input id='username' type='text' />
  				Password
  				<input id='password' type='text' />
  				Retype Password
  				<input id='passwordConfirm' type='text' />
  				<input type='submit' value='Sign Up' />
  			</form>
  		</div>
  	)
  }
 }





 SignIn.propTypes = {

 }

 export default SignUp;