import { useState } from 'react';

import Tabs from './Tabs';
import TabButton from './TabButton/TabButton';
import Section from './Section';
import { EXAMPLES } from '../data';



export default function Examples() {
        // Some React IDE may require the userState code to be the 1st line of the component, if its not the 1st line then React may error
        // allows up to use component specific state. Triggers the component to be rendered again this updating the value in UI.
        // useState wil always return 2 items
        // 1st item will always be the current state value
        // 2nd item will always be the state updating function
        // The data passed in useState is the inital state value stored by react OR 
        // if nothing is passed, then we can do IF statements in the JSX or like the one shown below
        const [selectedTopic, setSelectedTopic] = useState();  // useState is React hook

        let tabContent = (<p>Please select a topic</p>);
        if (selectedTopic) {
                console.log('evaluating IF statement');
                tabContent = (
                        <div id="tab-content">
                                <h3>{EXAMPLES[selectedTopic].title}</h3>
                                <p>{EXAMPLES[selectedTopic].description}</p>
                                <pre>
                                        <code>
                                                {EXAMPLES[selectedTopic].code}
                                        </code>
                                </pre>
                        </div>
                );
        }

        function handleSelect(selectedbutton) {
                // selectedbutton name of tab button

                // Here is the chain of events
                // Page is loaded and the App component is executed with the previous/inital state of selectedTopic
                // User clicks on a TabButton and this fires the click event which executes the handleSelect function
                // In handleSelect, the selectedbutton is passed into setSelectedTopic to update the state of selectedTopic
                // setSelectedTopic causes the component to re-execute and the update of the state is shceduled after the app component is executed.
                // So console log below prints the previous state of selectedTopic
                // After handleSelect has finished executing, the App component executes and the selectedTopic state is updated
                // The updated state is rendered in {selectedTopic} in the JSX
                setSelectedTopic(selectedbutton);
                console.log("selectedTopic:", selectedTopic);
        }

        return (
                <Section title='Examples' id='examples' className=''>
                        {/* <h2>Examples</h2> */}
                        {/*  Passing onSelect={handleSelect('components')} won't work because when the JSX is processed
                                                      the handleSelect function will get executed on the spot, which is not what we want. 
                                                      So an anonymous arrow function is used here so that the handleSelect function is not executed as the JSX is rendered 
                                                      Instead, when that line of code gets parsed it's just this arrow function that will be defined not the code inside of the arrow function
                                                     The arrow function will be passed to onSelect. 
                                                     In  TabButton component, the arrow function function is assigned to onClick event handler */}

                        {/* Passing JSX code in Tabs as args. The JSX can also be passed as children but its done this way
                             because there are CSS applied to the button in  TabButton and styling is tied to Section id=example.
                             See index.css  */}
                        <Tabs
                                ButtonsContainer={"menu"}
                                buttons={
                                        <>
                                                <TabButton
                                                        isSelected={selectedTopic === 'components'}
                                                        onClick={() => handleSelect('components')}>
                                                        Components
                                                </TabButton>

                                                <TabButton
                                                        isSelected={selectedTopic === 'jsx'}
                                                        onClick={() => handleSelect('jsx')}>
                                                        JSX
                                                </TabButton>

                                                <TabButton
                                                        isSelected={selectedTopic === 'props'}
                                                        onClick={() => handleSelect('props')}>
                                                        Props
                                                </TabButton>

                                                <TabButton
                                                        isSelected={selectedTopic === 'state'}
                                                        onClick={() => handleSelect('state')}>
                                                        State
                                                </TabButton>
                                        </>
                                }>
                                {/* Now the IF statement is evaluated to get the tabContent */}
                                {tabContent}
                        </Tabs>

                </Section>
        )
}