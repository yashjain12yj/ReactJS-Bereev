import React, { Component } from 'react';
import './css/Content.css';

class Content extends Component {
	constructor(props, context) {
		super(props, context);
		this.togglePassword = this.togglePassword.bind(this);
		this.state = {
	      	showPassword: false
	    };
	}

	togglePassword(){
		if(this.state.showPassword){
	      this.setState({showPassword: false});
	    }else{
	      this.setState({showPassword: true});
	    }
	}
  render() {
    return (
      <div className="Content">
        
        <table className="table table-striped table-bordered">
		  <thead className="thead-dark">
		    <tr>
		      <th scope="col">Username</th>
		      <th scope="col">Password</th>
		    </tr>
		  </thead>
		  <tbody>
		  	{Object.keys(this.props.details).map((type) => {
	            return (
	                <tr>
				      <td>{type}</td>
				      <td onDoubleClick={this.togglePassword}>{this.state.showPassword ? this.props.details[type] : '******'}</td>
				    </tr>
	            )
	        })}
		  </tbody>
		</table>
      </div>
    );
  }
}

export default Content;