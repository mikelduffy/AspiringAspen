import React from 'react';
import ReactDOM from 'react-dom';
import LeaderBoard from './LeaderBoard.jsx';
import SignIn from './SignIn.jsx'
import Waiting from './Waiting.jsx';
import Game from './Game.jsx';
import ReactAudioPlayer from 'react-audio-player';

class Home extends React.Component {
  constructor(props) {
    super(props);
    // state for the home page
    // mainly storing username and if the current player is waiting for an opponent or not
    this.state = {
      gameState: 'idle',
      username: '',
      hasUsername: false,
      showForm: true,
      showLeaderBoard: false,
      showSignIn: false,
      showSignInBtn: true
    };
  }

  componentDidMount () {
    // get new userdata on mount
    // this.props.socket.emit('send me userdata', this._receiveUserData.bind(this));
    // listen to see if there is a match
    this.props.socket.on('enter game', this._enterGame.bind(this));
    TweenMax.fromTo('.titlebar', 1.25, {y: -900, opacity: 0.8}, {y: 0, opacity: 1, ease: Expo.easeOut, delay: 0.35});
    TweenMax.fromTo('.lower', 1.25, {y: 900, opacity: 0.8}, {y: 0, opacity: 1, ease: Expo.easeOut, delay: 0.35});
    TweenMax.fromTo('.titlebar img', 0.5, {opacity: 0}, {opacity: 1, ease: Expo.easeOut, delay: 1.75});
    TweenMax.fromTo('.nameForm', 1.25, {opacity: 0}, {opacity: 1, ease: Expo.easeOut, delay: 3});
  }

  componentWillUnmount() {
    // this.props.socket.removeListener('userdata update', this._receiveUserData.bind(this));
  }

  // _receiveUserData(users) {
  //   this.setState({users: users});
  // }

  _enterGame() {
    // if there is a game, send the user to /game ot match up against opponent
    this.props.socket.emit('set username', this.state.username);
    this.props.router.push('/game');
  }

  playNow () {
    // indicates that the user is waiting on the client side and tells server that they are ready to play
    this.setState({ gameState: 'waiting' });
    this.props.socket.emit('queue', 'enqueue');
    // gamestate is waiting
  }

  handleShowLeaderBoard () {
    if (this.state.showLeaderBoard) {
      this.setState({
        showLeaderBoard: false
      });
    } else {
      this.setState({
        showLeaderBoard: true
      });
    }
  }

  handleShowSignIn () {
    if (this.state.showSignIn) {
      this.setState({
        showSignIn: false
      });
    } else {
      this.setState({
        showSignIn: true
      });
    }
  }

  cancelMatchmaking () {
    // cancels match making and tells server
    this.setState({ gameState: 'idle' });
    // gameState is idle, emit it back to server
    this.props.socket.emit('queue', 'dequeue');
  }

  // handleUsernameChange(e) {
  //   // when a user types in the form, set that value to be the username state and that the username has a username
  //   this.setState({username: e.target.value});
  //   this.setState({ hasUsername: true });
  // }

  handleSignIn(username, password) {
    console.log('username', username)
    this.setState({username: username, hasUsername: true, showSignIn: false, showSignInBtn:false});
      // emits the username to the server
   
    this.props.socket.emit('set username', username)
      // fires playNow
      // this.playNow();

    
  }

  render() {
    let gameState = this.state.gameState;
    return (
      <div id='home' className='wrapper' onClick={this.props.handleHideLeaderBoard}>
      <audio src="./audio/Motivated.mp3" autoPlay loop><p>Your browser does not support the <code>audio</code> element</p></audio>

        <div className='row'>
          <div className ='spacebackground' className="titlebar col s12">
            <div className='center-block'>
              { this.state.showSignIn ? (
                <SignIn socket={this.props.socket} handleSignIn={this.handleSignIn.bind(this)} />) : null }
              {this.state.showSignInBtn ? (<button className='signin-button z-depth-2' onClick={this.handleShowSignIn.bind(this)}> Sign In </button>) : null}
            </div>
            <h1>Space</h1>
            <img className='cardIcon' src='images/spaceship4.png'></img>
          </div>
        </div>
        { this.state.showLeaderBoard === true ? <LeaderBoard onShowLeaderBoard={this.handleShowLeaderBoard.bind(this)} socket ={this.props.socket}/> : null }
        { gameState === 'waiting' ? <Waiting cancelMatchmaking={this.cancelMatchmaking.bind(this)} username={this.state.username} /> : null }
        <div className='row lower'>
          <div id='' className='col s12'>
          <h1>STOMP</h1>
            <button className='leaderboard-button' onClick={this.handleShowLeaderBoard.bind(this)}>BOUNTY BOARD</button>
            { this.state.hasUsername ? <button className='play-button' onClick={ this.playNow.bind(this) }>PLAY <img src='img/playBtn.svg'></img> </button> : null }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
