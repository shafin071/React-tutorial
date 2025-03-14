
// Accordion and AccordionItem are compound components because they work together.
// Thikn of HTML select and option elements. 
// They don't work by standalone but when used together, you get a dropdown

// We could've written the entire Accordion in one component but we're keeping them seperate because
// we cant the Accordion items to be customizable. 

import { createContext, useContext, useState } from 'react';

import AccordionItem from './AccordionItem.jsx';
import AccordionTitle from './AccordionTitle.jsx';
import AccordionContent from './AccordionContent.jsx';

const AccordionContext = createContext();

// Since we are using Accordion and AccordionItem in the compound component pattern, we are passing the 
// AccordionItem into Accordion as children and there is no way to pass props from Accordion to AccordionItem.
// Hence, we are using createContext API to we can effectvely pass which tell the AccordionItem which item to keep open.

// Recall, earlier in the course we used createContext API along with useReducer hook to have a central management
//  of state that can be accessed in various component 

// This is a custom hook that can be called in other components to get access to the context object.
export function useAccordionContext() {
        const ctx = useContext(AccordionContext);

        if (!ctx) {
                throw new Error(
                        'Accordion-related components must be wrapped by <Accordion>.'
                );
        }

        return ctx;
}

export default function Accordion({ children, className }) {
        const [openItemId, setOpenItemId] = useState();

        function toggleItem(id) {
                setOpenItemId((prevId) => (prevId === id ? null : id));
        }

        // This is the context object the  chidren of Accordio will have access to.
        const contextValue = {
                openItemId,
                toggleItem,
        };

        return (
                <AccordionContext.Provider value={contextValue}>
                        <ul className={className}>{children}</ul>
                </AccordionContext.Provider>
        );
}


// Setting these components as a property of Accordion so it can be accessed in App.jsx
// There we no longer have to import AccordionItem, but can access AccordionItem as a property of Accordion.
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;

