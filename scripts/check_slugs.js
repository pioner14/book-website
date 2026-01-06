import fs from 'fs';

const files = fs.readdirSync('./src/content/book/ru/');
console.log('Files in ru/:');
files.forEach(file => {
  if (file.endsWith('.mdx')) {
    const slug = file.replace('.mdx', '');
    console.log('File:', file, '-> Slug would be:', 'ru/' + slug);
  }
});