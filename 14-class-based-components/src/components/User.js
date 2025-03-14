import { Component } from 'react';
import classes from './User.module.css';


// Class based components (CBC) can work with function based components (FBC)
// Meaning a function based component can render a CBC in its JSX, vice verca.
class User extends Component {

        componentWillUnmount() {
                // Executes when the component unmounts
                // Since there are 3 users in DUMMY_USERS, you will see the console log appear 3 times.
                console.log('User will unmount!');
        }

        render() {
                return <li className={classes.user}>{this.props.name}</li>;
        }
}

// const User = (props) => {
//         return <li className={classes.user}>{props.name}</li>;
// };

export default User;
