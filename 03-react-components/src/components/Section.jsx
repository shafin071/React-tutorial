
export default function Section({ title, children, ...props}) {
        // props contain all the id, className attributes
        // They can be explicitly passed as the other args but that can become very verbose
        return (
                <section {...props}>
                        <h2>{title}</h2>
                        {children}
                </section>
        )
}