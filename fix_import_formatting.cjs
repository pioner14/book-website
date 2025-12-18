const fs = require('fs');
const path = require('path');

const chaptersDir = '/home/nick/Projects/book-website/src/content/book/ru/';

// Обрабатываем главы 2-10
for (let i = 2; i <= 10; i++) {
  const filePath = path.join(chaptersDir, `chapter${i}.mdx`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Исправляем формат, добавляя пустую строку после импорта
    const correctedContent = content.replace(
      /(import ChapterImage from[\s\S]*?)(# .+)/,
      '$1\n\n$2'
    );
    
    if (correctedContent !== content) {
      fs.writeFileSync(filePath, correctedContent);
      console.log(`Исправлен формат в главе ${i}`);
    }
  }
}

console.log('Все файлы глав исправлены');