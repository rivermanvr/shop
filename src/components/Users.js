import React from "react";
import { connect } from "react-redux";
import store from "../store";
import { deleteUser } from "../reducers/users";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    const { deleteUser } = this.props;
    store.dispatch(deleteUser(e.target.value));
  }

  toggleAdmin() {}

  render() {
    const { users } = this.props;
    return (
      <div className="col-xs-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3>Users</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {users.map(user => (
                <li className="list-group-item clearfix" key={user.id}>
                  <strong>{user.name}</strong>
                  <br />
                  <div className="btn-group">
                    <button
                      className="btn btn-warning btn-sm"
                      value={user.id}
                      onClick={this.handleDelete}
                    >
                      Delete
                    </button>
                    <button className="btn btn-primary btn-sm" value={user.id}>
                      {user.isAdmin ? "Remove Admin" : "Make Admin"}
                    </button>
                    <button className="btn btn-default btn-sm" value={user.id}>
                      Reset PW
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users };
};

const mapDispatchToProps = dispatch => {
  return { deleteUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);