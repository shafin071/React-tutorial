

export default function Tabs({ children, buttons, ButtonsContainer = 'menu' }) {
        // This is a reusable Tab component
        // buttons is JSX code passed in as argument
        // The idea is to keep the Tabs component as a reusable abstract wrapper, but inside we can pass in whatever
        // ButtonsContainer can be html tag as string or custom component. We want Tabs to be flexible. 
        //      - Needs to start with a capital letter to signify its a custom component that can hold html tag or custom component

        return (
                <>
                        <ButtonsContainer>{buttons}</ButtonsContainer>
                        {children}
                </>
        )

}