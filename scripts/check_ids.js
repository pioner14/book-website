
import { getCollection } from 'astro:content';

async function checkIds() {
    const chapters = await getCollection('book');
    chapters.forEach(ch => {
        console.log(`ID: ${ch.id}, SLUG: ${ch.slug}`);
    });
}

checkIds();
