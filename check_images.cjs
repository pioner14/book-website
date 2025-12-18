const fs = require('fs');
const path = require('path');

// Проверяем все MDX файлы
const contentDir = '/home/nick/Projects/book-website/src/content/book/';
const languages = ['ru', 'ua', 'fr'];

for (const lang of languages) {
  const langDir = path.join(contentDir, lang);
  if (fs.existsSync(langDir)) {
    console.log(`\nПроверка языка: ${lang}`);
    const files = fs.readdirSync(langDir);
    
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const filePath = path.join(langDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Ищем все изображения ChapterImage
        const imageRegex = /<ChapterImage\s+src="([^"]+)"\s+alt="[^"]*"[^>]*>/g;
        let match;
        let hasMissingImages = false;
        
        while ((match = imageRegex.exec(content)) !== null) {
          const imagePath = match[1];
          const fullImagePath = path.join('/home/nick/Projects/book-website/public', imagePath);
          
          if (!fs.existsSync(fullImagePath)) {
            console.log(`  ❌ НЕТ ФАЙЛА: ${imagePath} в файле ${file}`);
            hasMissingImages = true;
          } else {
            console.log(`  ✅ Есть файл: ${imagePath}`);
          }
        }
        
        if (!hasMissingImages) {
          console.log(`  Все изображения в ${file} существуют`);
        }
      }
    }
  }
}

console.log('\nПроверка завершена!');