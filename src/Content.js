import React, { Component } from 'react';
import './css/Content.css';

class Content extends Component {
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
				      <td>{this.props.details[type]}</td>
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