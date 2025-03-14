import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export default function MealItem({ title, slug, image, summary, creator }) {
        return (
                <article className={classes.meal}>
                        <header>
                                <div className={classes.image}>
                                        {/* The images will be dynamically loaded from the DB so with the Image tag, we won't know
                                              the width and height during build time. Hence we use the 'fill' property.
                                              It tells the image to fill the available space.  */}
                                        <Image src={image} alt={title} fill />
                                </div>
                                <div className={classes.headerText}>
                                        <h2>{title}</h2>
                                        <p>by {creator}</p>
                                </div>
                        </header>
                        <div className={classes.content}>
                                <p className={classes.summary}>{summary}</p>
                                <div className={classes.actions}>
                                        <Link href={`/meals/${slug}`}>View Details</Link>
                                </div>
                        </div>
                </article>
        );
}