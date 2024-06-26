import { styled } from 'styled-components';

import logo from '../../assets/logo.png';
import classes from './Header.module.css';   // the 'module' in the css file name scopes the CSS only to Header component


// Styled component with nested rules and media queries
// The StyledHeader can now replace header tag in the JSX
// But I didn't replace in order to keep the <p className={classes.paragraph}> which was an example from a previous video
const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;

  & img {
    object-fit: contain;
    margin-bottom: 2rem;
    width: 11rem;
    height: 11rem;
  }
  
  & h1 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-align: center;
    text-transform: uppercase;
    color: #9a3412;
    font-family: 'Pacifico', cursive;
    margin: 0;
  }
  
  & p {
    text-align: center;
    color: #a39191;
    /* color: red; */
    margin: 0;
  }
  
  @media (min-width: 768px) {
  
    margin-bottom: 4rem;
  
    & h1 {
      font-size: 2.25rem;
    }
  }
`;


// NOTE: when vite compiles the JSX into HTML, all the CSS files are linked at the top, so its possible for styles to clash.
// Renaming the Header.css file to Header.module.css tells Vite to scope the CSS styles in the file with this component
// vite will translate className={classes.paragraph} to class="paragraph-swj-456"
// so the paragraph name was appended with a unique identifier 
// so you can have another style class named 'paragraph' in another CSS file and they won't clash

export default function Header() {
        return (
                <header>
                        <img src={logo} alt="A canvas" />
                        <h1>ReactArt</h1>
                        {/* <p className={classes.paragraph}> is an example of scoping CSS rules with CSS modules */}
                        <p className={classes.paragraph}>A community of artists and art-lovers.</p>
                </header>
        );
}
