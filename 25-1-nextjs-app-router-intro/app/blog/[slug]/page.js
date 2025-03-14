
// NOTE: this page.js is inside a folder [slug]
// this folder name is a special syntax supported by NextJS in order to create a dynamic route.
// [] is the syntax, you can put whatever inside it.

// NextJS passes props object by default to these page components
// We are unpacking the object and grabbing the params object from the props.
export default function BlogPostPage({ params }) {
        return (
                <main>
                        <h1>Blog Post</h1>
                        <p>{params.slug}</p>
                </main>
        );
}