const fs = require('fs');
const path = require('path');

// Конвертируем украинские файлы
const uaDir = '/home/nick/Projects/book-website/src/content/book/ua';
const uaFiles = fs.readdirSync(uaDir).filter(file => file.endsWith('.md'));

for (const file of uaFiles) {
  const mdPath = path.join(uaDir, file);
  const mdxPath = path.join(uaDir, file.replace('.md', '.mdx'));

  // Читаем содержимое .md файла
  const content = fs.readFileSync(mdPath, 'utf8');

  // Создаем .mdx файл с тем же содержимым
  fs.writeFileSync(mdxPath, content);

  // Удаляем старый .md файл
  fs.unlinkSync(mdPath);

  console.log(`Конвертирован файл: ${file} -> ${file.replace('.md', '.mdx')}`);
}

// Конвертируем французские файлы
const frDir = '/home/nick/Projects/book-website/src/content/book/fr';
const frFiles = fs.readdirSync(frDir).filter(file => file.endsWith('.md'));

for (const file of frFiles) {
  const mdPath = path.join(frDir, file);
  const mdxPath = path.join(frDir, file.replace('.md', '.mdx'));

  // Читаем содержимое .md файла
  const content = fs.readFileSync(mdPath, 'utf8');

  // Создаем .mdx файл с тем же содержимым
  fs.writeFileSync(mdxPath, content);

  // Удаляем старый .md файл
  fs.unlinkSync(mdPath);

  console.log(`Конвертирован файл: ${file} -> ${file.replace('.md', '.mdx')}`);
}

console.log('Все MD файлы конвертированы в MDX');