import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';


// Wrapper for the app page
function Layout(props) {
        return (
                <div>
                        <MainNavigation />
                        <main className={classes.main}>{props.children}</main>
                </div>
        );
}

export default Layout;
