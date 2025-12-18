const fs = require('fs');
const path = require('path');

const chaptersDir = '/home/nick/Projects/book-website/src/content/book/ru/';

// Получаем список всех .mdx файлов
const mdxFiles = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.mdx'));

for (const file of mdxFiles) {
  const filePath = path.join(chaptersDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Удаляем все div-теги с заголовками (и заменяем их на Markdown заголовки)
  content = content.replace(/<div class="text-3xl font-heading font-bold mb-6 text-center tracking-wide">(.*?)<\/div>\n\n/, '# $1\n\n');
  
  // Исправляем неправильные теги компонентов на правильные (с PascalCase)
  content = content.replace(/<chapterimage/g, '<ChapterImage');
  content = content.replace(/<Chapterimage/g, '<ChapterImage');
  content = content.replace(/<\/chapterimage>/g, '</ChapterImage>');
  content = content.replace(/<\/Chapterimage>/g, '</ChapterImage>');
  
  // Заменяем теги img на компоненты ChapterImage
  content = content.replace(/<img\s+src="([^"]+)"\s+alt="([^"]+)"\s+class="[^"]+"\s*\/?>/g, 
    '<ChapterImage src="$1" alt="$2" />');
  
  // Исправляем потенциальные повторные импорты
  const importRegex = /import ChapterImage from '\.\.\/\.\.\/\.\.\/components\/ChapterImage\.astro'\n\n/;
  const matches = content.match(importRegex);
  if (matches && matches.length > 1) {
    // Оставляем только первый импорт
    content = content.replace(importRegex, '');
    const firstMatch = matches[0];
    content = content.replace(/^---\n([\s\S]*?)---\n/, (match) => `${match}\n${firstMatch}\n`);
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Очищен файл: ${file}`);
}

console.log('Все файлы очищены от неправильных HTML-тегов');