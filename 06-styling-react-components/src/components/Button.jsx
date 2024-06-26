import { styled } from 'styled-components';

// Styled component with pseudo-selectors like :hover
// NOTE: &:hover means button:hover   & :hover means hover on child elements in button
// Keeping styled components in a seperate JSX file means it can be resued in other places
const Button = styled.button`
  padding: 1rem 2rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 0.25rem;
  color: #1f2937;
  background-color: #f0b322;
  border-radius: 6px;
  border: none;

  &:hover {
    background-color: #f0920e;
  }
`;

export default Button;