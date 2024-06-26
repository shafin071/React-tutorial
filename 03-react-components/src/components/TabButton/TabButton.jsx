

export default function TabButton({children, isSelected, ...props}) {
        // children is a built in input param of a component
        // It captures the data between the component opening/closing tags
        // ...prop has the onClick func which is going to be an anonymous arrow function, see Example.jsx
        console.log("TabButton COMPONENT EXECUTING ");
        let setActive = isSelected ? "active" : "";
        console.log("props: ", props);
        return (
                // className is JSX version of class
                <li><button className={setActive} {...props}>{children}</button></li>
        )
}