import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
        test('renders posts if request succeeds', async () => {

                // jest is a global object provided by the jest package
                // jest.fn() creates a mock function
                window.fetch = jest.fn();

                // return value of the mock function
                window.fetch.mockResolvedValueOnce({
                        json: async () => [{ id: 'p1', title: 'First post' }],
                });
                
                render(<Async />);

                // To see all the available roles see:
                // https://www.w3.org/TR/html-aria/#docconformance
                const listItemElements = await screen.findAllByRole('listitem');
                expect(listItemElements).not.toHaveLength(0);
        });
});