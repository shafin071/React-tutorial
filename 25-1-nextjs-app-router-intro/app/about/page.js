
// Creating an about folder with a page.js file inside creates an /about route to this component
// with NextJS, it needs to be page.js for it to work. Changing this script name results in a 404
export default function AboutPage() {
        return (
                <main>
                        <h1>About Us</h1>
                </main>
        );
}