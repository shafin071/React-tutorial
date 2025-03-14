
// not-found.js is a special NextJS file for handling 404s
// It will be triggered for app/page.js and any subfolder page.js
export default function NotFound() {
        return (
                <main className="not-found">
                        <h1>Not found</h1>
                        <p>Unfortunately, we could not find the requested page or resource.</p>
                </main>
        );
}