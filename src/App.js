import React, { Component } from 'react';
import './css/App.css';
import Content from './Content';
import { Alert, Button, Modal } from 'react-bootstrap';

// var details = JSON.parse(localStorage.getItem('details')) || {};

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShowRegistration = this.handleShowRegistration.bind(this);
    this.handleCloseRegistration = this.handleCloseRegistration.bind(this);
    this.handleShowLogin = this.handleShowLogin.bind(this);
    this.handleCloseLogin = this.handleCloseLogin.bind(this);
    this.handleSubmitRegistration = this.handleSubmitRegistration.bind(this);
    this.handleChangeUsernameRegistration = this.handleChangeUsernameRegistration.bind(this);
    this.handleChangePasswordRegistration = this.handleChangePasswordRegistration.bind(this);
    this.handleChangeUsernameLogin = this.handleChangeUsernameLogin.bind(this);
    this.handleChangePasswordLogin = this.handleChangePasswordLogin.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);

    this.state = {
      showRegistration: false,
      showLogin: false,
      showPassword: false,
      formErrors: {},
      details: {},
      loggedIn: false
    };
  }
  componentWillMount(){
    var details = JSON.parse(localStorage.getItem('details')) || {};
    this.setState({details: details});
  }

  

  handleSubmitRegistration(e){
    e.preventDefault();
    const username = this.state.userfield;
    var users = Object.keys(this.state.details);
    for(var i = 0; i < users.length; i++){
      if(users[i] === username){
        this.setState({formErrors: {username: 'already exist'}})
        console.log("value exist")
        return '';  
      }
    }
    const password = this.state.passfield;
    console.log(username, password);
    var details = this.state.details;
    details[username]= password;
    localStorage.setItem('details', JSON.stringify(details));
    this.setState({ details: details });
    this.handleCloseRegistration()
    alert("User Registered");
  }

  handleSubmitLogin(e){
    e.preventDefault();
    const username = this.state.userfieldlogin;
    const password = this.state.passfieldlogin;
    var details = this.state.details;
    // console.log(details)
    var users = Object.keys(details);
    for(var i = 0; i < users.length; i++){
      if(users[i] === username){
        if (details[username] === password) {
          this.setState({invalidPassword: false});
          this.setState({loggedIn: true}); 
          this.handleCloseLogin();
        }
        else{
          this.setState({invalidPassword: true});
        }
      }
    }
    
  }

  togglePassword(){
    if(this.state.showPassword){
      this.setState({showPassword: false});
    }else{
      this.setState({showPassword: true});
    }
  }
  handleChangeUsernameRegistration(e){
    var username = e.target.value;
    this.setState({userfield: username});
  }

  handleChangePasswordRegistration(e){
    const password = e.target.value;
    this.setState({passfield: password});
  }

  handleChangeUsernameLogin(e){
    var username = e.target.value;
    this.setState({userfieldlogin: username});
  }

  handleChangePasswordLogin(e){
    const password = e.target.value;
    this.setState({passfieldlogin: password});
  }

  handleCloseRegistration() {
    this.setState({ showRegistration: false });
  }

  handleShowRegistration() {
    this.setState({ showRegistration: true });
  }
  handleCloseLogin() {
    this.setState({ showLogin: false });
  }

  handleShowLogin() {
    this.setState({ showLogin: true });
  }

  handleSignOut(){
    this.setState({loggedIn: false})
  }
  render() {
    
    const registrationButton = (
      <Button bsStyle="primary" id="modal-button" bsSize="large" onClick={this.handleShowRegistration}>
        Registration
      </Button>
    );

    const loginButton = (
      <Button bsStyle="primary" id="modal-button" bsSize="large" onClick={this.handleShowLogin}>
        Login
      </Button>
    );
    const signoutButton = (
      <Button bsStyle="primary" id="modal-button" bsSize="large" onClick={this.handleSignOut}>
        Sign Out
      </Button>
    );
    
      
    var alert = (
      <Alert bsStyle="warning">
        {Object.keys(this.state.formErrors).map((fieldName, i) => {
            if(this.state.formErrors[fieldName].length > 0){
              return (
                <p key={i}>{fieldName} {this.state.formErrors[fieldName]}</p>
            )        
            } else {
              return '';
            }
        })}
      </Alert>
    )

    return (
      <div className="App">
        <header className="App-header">
          {this.state.loggedIn ? '' : registrationButton }
          {this.state.loggedIn ? signoutButton : loginButton}
        </header>
        {/* Modal for Registration */}
        <Modal show={this.state.showRegistration} onHide={this.handleCloseRegistration}>
          <Modal.Header closeButton>
            <Modal.Title>Registration</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="registrationForm" id="form" onSubmit={this.handleSubmitRegistration}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username" required onChange={this.handleChangeUsernameRegistration}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type={this.state.showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Password" required onChange={this.handleChangePasswordRegistration} onDoubleClick={this.togglePassword} />
              </div>
              <button type="submit" className="btn btn-primary" >Submit</button> 
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseRegistration}>Close</Button>
          </Modal.Footer>
        </Modal>
        
        {/* Modal for Login */}
        <Modal show={this.state.showLogin} onHide={this.handleCloseLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="loginForm" id="form" onSubmit={this.handleSubmitLogin}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username" onChange={this.handleChangeUsernameLogin}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type={this.state.showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Password" onChange={this.handleChangePasswordLogin} onDoubleClick={this.togglePassword} />
              </div>
              <div className="invalid-feedback">
                {this.state.invalidPassword ? "Invalid Username or Password" : ''}
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseLogin}>Close</Button>
          </Modal.Footer>
        </Modal>

        {Object.keys(this.state.formErrors).length > 0 ? alert : ""}
        <div className="App-intro">
          <h1>Welcome</h1>
          {this.state.loggedIn ? <Content details={this.state.details}/> : ''}
        </div>
      </div>
    );
  }
}

export default App;
