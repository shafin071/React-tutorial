import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';


const db = sql('meals.db');

export async function getMeals() {
        // the timeout is just to add some delay to illustrate component loading state as its waiting for the data.
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // triggering an error to show the app/meals/error.js in action
        // throw new Error('some error');   

        return db.prepare('SELECT * FROM meals').all();
}


export function getMeal(slug) {
        // IMPORTANT: 
        // 'SELECT * FROM meals WHERE slug = ' + slug can expose your query to SQL injection attack.
        // because since the slug is coming from the borwser URL, someone can type in a rogue SQL queryin the URL
        // which will be passed in as a slug.
        // for queries use the 'get' filter query as shown below. Under the hood, sqlite3 will protect from such attacks.
        return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}


export async function saveMeal(meal) {
        meal.slug = slugify(meal.title, { lower: true });
        meal.instructions = xss(meal.instructions);

        const extension = meal.image.name.split('.').pop();
        const fileName = `${meal.slug}.${extension}`;

        const stream = fs.createWriteStream(`public/images/${fileName}`);
        const bufferedImage = await meal.image.arrayBuffer();   // returns a promise that needs to be awaited.

        stream.write(Buffer.from(bufferedImage), (error) => {
                if (error) {
                        throw new Error('Saving image failed!');
                }
        });

        meal.image = `/images/${fileName}`;

        db.prepare(`
          INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
          VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
          )
        `).run(meal);
}