var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');


var departmentsJSON = [
  {
    "id": 1,
    "name": "Marketing",
    "users": [
      {
        "id": 1,
        "department_id": 1,
        "full_name": "Harold Runolfsdottir",
        "role_name": "2d JR for Nobody",
        "avatar_url": "https://dev.betterfeedback.com/uploads/user/avatar/6/Robert_Downey_Jr_avp_Iron_Man_3_Paris_2.jpg"
      },
      {
        "id": 2,
        "department_id": 1,
        "full_name": "dfgh Spencer",
        "role_name": "RoR developer",
        "avatar_url": "https://dev.betterfeedback.com/uploads/user/avatar/8/utopic1.jpg"
      },
      {
        "id": 3,
        "department_id": 1,
        "full_name": "Danika dfgh",
        "role_name": "Senior QA",
        "avatar_url": "https://dev.betterfeedback.com/uploads/user/avatar/9/8.jpg"
      }
    ]
  },
  {
    "id": 2,
    "name": "Sales",
    "users": [
      {
        "id": 4,
        "department_id": 2,
        "full_name": "Harold fff",
        "role_name": "2d JR for Nobody",
        "avatar_url": "https://dev.betterfeedback.com/uploads/user/avatar/6/Robert_Downey_Jr_avp_Iron_Man_3_Paris_2.jpg"
      },
      {
        "id": 5,
        "department_id": 2,
        "full_name": "C555aterina fghfghd",
        "role_name": "RoR developer",
        "avatar_url": "https://dev.betterfeedback.com/uploads/user/avatar/8/utopic1.jpg"
      },
      {
        "id": 6,
        "department_id": 2,
        "full_name": "Danrth5ika Rodrig555uez",
        "role_name": "Senior QA",
        "avatar_url": "https://dev.betterfeedback.com/uploads/user/avatar/9/8.jpg"
      }
    ]
  }
];

var SelectUsers = React.createClass({
  getInitialState: function() {
    return {
      depQuery: 'all'
    };
  },

  componentWillMount: function() {
    this.departments = this.props.json;
    this.users = this.getUsers();
    this.selectedUsers = [];
    this.usersFilter('all');
  },

  getUsers: function() {
    let users = [];

    this.departments.forEach(function(item) {
      item.users.forEach(function(user) {
        if (users.map(u => u.id).indexOf(user.id) === -1) {
          users.push(user);
        }
      })
    });

    return users;
  },

  selectDep: function(id) {
    this.setState({depQuery: id});
    this.usersFilter(id);
  },

  selectUser: function(id) {
    this.selectedUsers.push(id);
  },

  usersFilter: function(depQuery) {
    let result;

    if (depQuery === 'all') {
      result = this.users;
    } else {
      result = this.users.filter(item => item.department_id === +depQuery);
    }

    this.filteredUsers = result;
  },


  render: function() {
    return (
      <div className="selector">
        <SelectedUsers selectedUsers={this.selectedUsers}/>

        <div className="lists">
          <DepartmentsList
            departments={this.departments}
            selectedDep={this.state.depQuery}
            selectDep={this.selectDep}
            />
          <UsersList
            users={this.filteredUsers}
            selectUser={this.selectUser}
            />
        </div>
      </div>
    );
  }
});

var SelectedUsers = React.createClass({
  propTypes: {
    selectedUsers: React.PropTypes.array
  },

  render: function() {
    debugger
    let selectedUsersList = this.props.selectedUsers.map(user => {
      debugger;
      return (
        <div className="label" key={user.id}>
          {user.full_name}
          ×
        </div>
      );
    });
    return (
      <div className="selected-users">
        <div className="label">
          {selectedUsersList}
        </div>
        add
      </div>
    );
  }
});

var DepartmentsList = React.createClass({
  propTypes: {
    departments: React.PropTypes.array,
    selectedDep: React.PropTypes.any.isRequired,
    selectDep: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      selectedDep: this.props.selectedDep
    };
  },

  selectDep: function(ev) {
    let depId = ev.currentTarget.dataset.id;
    this.props.selectDep(depId);
  },


  render: function() {
    let departmentsList = this.props.departments.map(dep => {
      let departmentClass = classNames({
        'pointer': true,
        'selected-department': (this.props.selectedDep == dep.id)
      });
      return (
        <div className={departmentClass} key={dep.id} data-id={dep.id} onClick={this.selectDep}>{dep.name}</div>
      );
    });
    let departmentClass = classNames({
      'pointer': true,
      'selected-department': (this.props.selectedDep == 'all')
    });
    return (
      <div className="departments-list">
        <div data-id="all" className={departmentClass} onClick={this.selectDep}>All</div>
        {departmentsList}
      </div>
    );
  }
});

var UsersList = React.createClass({
  propTypes: {
    users: React.PropTypes.array,
    selectUser: React.PropTypes.func.isRequired
  },

  selectUser: function(ev) {
    debugger
    let userId = +ev.currentTarget.dataset.id;
    this.props.selectUser(userId);
  },

  render: function() {
    let usersList = this.props.users.map(user => {
      return (
        <div key={user.id} data-id={user.id} onClick={this.selectUser}> {user.full_name} </div>
      );
    });
    return (
      <div className="users-list">
        {usersList}
      </div>
    );
  }
});

module.exports = SelectUsers;


ReactDOM.render(<SelectUsers json={departmentsJSON}/>, document.getElementById('SelectUsers'));

