import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

// this defines a test suite i.e. a way of grouping the tests
describe('Greeting component', () => {

        test('renders Hello World as a text', () => {
                // Arrange: set up the test data, conditions and test env
                render(<Greeting />);

                // Act
                // run logic that should be tested i.e execute function

                // Assert
                const helloWorldElement = screen.getByText('Hello World!'); // looks for an exact match, to look for a similar match:
                // const helloWorldElement = screen.getByText('Hello World!', {exact: false});
                expect(helloWorldElement).toBeInTheDocument();
        });

        test('renders "good to see" you if the button was NOT clicked', () => {
                render(<Greeting />);

                const outputElement = screen.getByText('good to see you', { exact: false });
                expect(outputElement).toBeInTheDocument();
        });

        test('renders "Changed!" if the button was clicked', async () => {
                // Arrange
                render(<Greeting />);

                // Act
                const buttonElement = screen.getByRole('button');
                await userEvent.click(buttonElement);

                // Assert
                const outputElement = screen.getByText('Changed!');
                expect(outputElement).toBeInTheDocument();
        });

        test('does not render "good to see you" if the button was clicked', async () => {
                // Arrange
                render(<Greeting />);

                // Act
                const buttonElement = screen.getByRole('button');
                await userEvent.click(buttonElement);

                // Assert
                const outputElement = screen.queryByText('good to see you', {
                        exact: false,
                });
                expect(outputElement).toBeNull();
        });

});
