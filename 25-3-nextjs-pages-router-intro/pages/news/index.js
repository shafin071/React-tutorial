// our-domain.com/news
// index.js is the same thing as page.js in app-router

import Link from 'next/link';
import { Fragment } from 'react';

function NewsPage() {
        return (
                <Fragment>
                        <h1>The News Page</h1>
                        <ul>
                                <li>
                                        {/* Link makes it a single-page app and navigating to the link will not re-send a HTTP request to the backend */}
                                        <Link href='/news/nextjs-is-a-great-framework'>
                                                NextJS Is A Great Framework
                                        </Link>
                                </li>
                                <li>Something Else</li>
                        </ul>
                </Fragment>
        );
}

export default NewsPage;