import { Fragment, useState, useEffect, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';


const DUMMY_USERS = [
        { id: 'u1', name: 'Max' },
        { id: 'u2', name: 'Manuel' },
        { id: 'u3', name: 'Julie' },
];

class UserFinder extends Component {
        static contextType = UsersContext;

        constructor() {
                super();
                this.state = {
                        filteredUsers: [],
                        searchTerm: '',
                };
        }

        componentDidMount() {
                // After the component is executed for the first time
                console.log("componentDidMount...");
                this.setState({ filteredUsers: this.context.users });
        }

        componentDidUpdate(prevProps, prevState) {
                console.log("componentDidUpdate...")
                // After the component re-excuted due to state change. Thgis method expects the above 2 args.
                // the if statement does the same thing as dependency array in useEffect
                // will only trigger the state to update if input changed
                if (prevState.searchTerm !== this.state.searchTerm) {
                        this.setState({
                                filteredUsers: DUMMY_USERS.filter((user) =>
                                        user.name.includes(this.state.searchTerm)
                                ),
                        });
                }
        }

        searchChangeHandler(event) {
                console.log("search term: ", event.target.value)
                console.log("this: ", this)
                this.setState({ searchTerm: event.target.value });
        }

        render() {
                return (
                        <Fragment>
                                <div className={classes.finder}>
                                        <input type='search' onChange={this.searchChangeHandler.bind(this)} />
                                </div>
                                <Users users={this.state.filteredUsers} />
                        </Fragment>
                );
        }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;