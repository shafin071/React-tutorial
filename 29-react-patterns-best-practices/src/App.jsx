import Accordion from './components/Accordion/Accordion.jsx';
import SearchableList from './components/SearchableList/SearchableList.jsx';
import savannaImg from './assets/african-savanna.jpg';
import amazonImg from './assets/amazon-river.jpg';
import caribbeanImg from './assets/caribbean-beach.jpg';
import desertImg from './assets/desert-dunes.jpg';
import forestImg from './assets/forest-waterfall.jpg';
import Place from './Place.jsx';

const PLACES = [
        {
                id: 'african-savanna',
                image: savannaImg,
                title: 'African Savanna',
                description: 'Experience the beauty of nature.',
        },
        {
                id: 'amazon-river',
                image: amazonImg,
                title: 'Amazon River',
                description: 'Get to know the largest river in the world.',
        },
        {
                id: 'caribbean-beach',
                image: caribbeanImg,
                title: 'Caribbean Beach',
                description: 'Enjoy the sun and the beach.',
        },
        {
                id: 'desert-dunes',
                image: desertImg,
                title: 'Desert Dunes',
                description: 'Discover the desert life.',
        },
        {
                id: 'forest-waterfall',
                image: forestImg,
                title: 'Forest Waterfall',
                description: 'Listen to the sound of the water.',
        },
];

function App() {
        return (
                <main>

                        {/* This section demonstrates compound components where components work together */}
                        <section>
                                <h2>Why work with us?</h2>

                                <Accordion className="accordion">
                                        <Accordion.Item id="experience" className="accordion-item">
                                                <Accordion.Title className="accordion-item-title">
                                                        We got 20 years of experience
                                                </Accordion.Title>
                                                <Accordion.Content className="accordion-item-content">
                                                        <article>
                                                                <p>You can&apos;t go wrong with us.</p>
                                                                <p>
                                                                        We are in the business of planning highly individualized
                                                                        vacation trips for more than 20 years.
                                                                </p>
                                                        </article>
                                                </Accordion.Content>
                                        </Accordion.Item>
                                        <Accordion.Item id="local-guides" className="accordion-item">
                                                <Accordion.Title className="accordion-item-title">
                                                        We are working with local guides
                                                </Accordion.Title>
                                                <Accordion.Content className="accordion-item-content">
                                                        <article>
                                                                <p>We are not doing this along from our office.</p>
                                                                <p>
                                                                        Instead, we are working with local guides to ensure a safe and
                                                                        pleasant vacation.
                                                                </p>
                                                        </article>
                                                </Accordion.Content>
                                        </Accordion.Item>
                                </Accordion>
                        </section>


                        {/* This section demonstrates render props */}
                        {/* The reason this pattern is used in this scenario is because you have a searchable component that
                        can either render a list of strings or a list of complex object like PLACES. We pass the arrow functions
                        as children and these functions render what needs to be rendered.  */}
                        <section>

                                {/* {(item) => item.id} is single line arrow function that takes the item object as input
                                 and returns the item id */}
                                <SearchableList items={PLACES} itemKeyFn={(item) => item.id}>
                                        {/* This is also a single line arrow function that takes item object as input and returns 
                                        the Place component .
                                        To understand where the item input arg for this func comes from, look at the SearchableList component.

                                        This is the render props pattern where this single line function is passed to SearchableList
                                        as children. This func as children is then used to render the Places content. 
                                        */}
                                        {(item) => <Place item={item} />}
                                </SearchableList>
                                
                                <SearchableList items={['item 1', 'item 2']} itemKeyFn={(item) => item}>
                                        {(item) => item}
                                </SearchableList>
                        </section>
                </main>
        );
}

export default App;