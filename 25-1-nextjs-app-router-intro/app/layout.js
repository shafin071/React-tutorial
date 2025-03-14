import './globals.css'

// metadata contains the content of the <head> element. 
// You'll notice every html page usually has a <head> section atthe top and that's what this metadata provides.
// NextJS has its own way of populating the head metadata.
export const metadata = {
        title: 'NextJS Course App',
        description: 'Your first NextJS app!',
};

// every nextJS project needs a layout.js in the root folder. Page folders like 'about' can also have its own layout.js
// layout and page js files work together. layout is the wrapper and page is the actually content for the page.
// the children prop will be the content of the page.js component.
export default function RootLayout({ children }) {
        return (
                <html lang="en">
                        <body>{children}</body>
                </html>
        );
}

// NOTE: icon.png is also a resrved file name for NextJS. If you put an image file with that name in /app
// that image will be used as the favicon (the icon in the browser tab)
