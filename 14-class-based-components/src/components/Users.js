import { Component } from 'react';
import { useState } from 'react';
import User from './User';

import classes from './Users.module.css';

const DUMMY_USERS = [
        { id: 'u1', name: 'Max' },
        { id: 'u2', name: 'Manuel' },
        { id: 'u3', name: 'Julie' },
];

class Users extends Component {
        constructor() {
                super();  // this calls the constructor of the Component class

                // CBC supports only a sinlge state attribute. So you need group your state variables here.
                // Unlike FBC where you can declare mutliple states in different lines using useState()
                this.state = {
                        showUsers: true,
                        more: 'Test',
                };
        }

        componentDidUpdate() {
                // try {
                //   someCodeWhichMightFail()
                // } catch (err) {
                //   // handle error
                // }

                // This raising error will be caught in errorBoundary.js
                if (this.props.users.length === 0) {
                  throw new Error('No users provided!');
                }
              }

        toggleUsersHandler() {
                // this.state.showUsers = false; // NOT the right way
                this.setState((curState) => {
                        return { showUsers: !curState.showUsers };
                });
        }

        render() {
                const usersList = (
                        <ul>
                                {this.props.users.map((user) => (
                                        <User key={user.id} name={user.name} />
                                ))}
                        </ul>
                );

                return (
                        <div className={classes.users}>
                                {/* binding of 'this' is required here to give the 'this' inside the toggleUsersHandler same context 
                                     when this peice of code is evaluated. Otherwise toggleUsersHandler may not know what 'this' is 
                                     More explanation here:
                                     https://academind.com/tutorials/this-keyword-function-references/
                                     */}
                                <button onClick={this.toggleUsersHandler.bind(this)}>
                                        {this.state.showUsers ? 'Hide' : 'Show'} Users
                                </button>
                                {this.state.showUsers && usersList}
                        </div>
                );
        }
}

// const Users = () => {
//         const [showUsers, setShowUsers] = useState(true);

//         const toggleUsersHandler = () => {
//                 setShowUsers((curState) => !curState);
//         };

//         const usersList = (
//                 <ul>
//                         {DUMMY_USERS.map((user) => (
//                                 <User key={user.id} name={user.name} />
//                         ))}
//                 </ul>
//         );

//         return (
//                 <div className={classes.users}>
//                         <button onClick={toggleUsersHandler}>
//                                 {showUsers ? 'Hide' : 'Show'} Users
//                         </button>
//                         {showUsers && usersList}
//                 </div>
//         );
// };

export default Users;
