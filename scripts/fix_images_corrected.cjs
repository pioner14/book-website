const fs = require('fs');
const path = require('path');

const chaptersDir = '/home/nick/Projects/book-website/src/content/book/ru/';

// Получаем список всех .mdx файлов
const mdxFiles = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.mdx'));

for (const file of mdxFiles) {
  const filePath = path.join(chaptersDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Получаем номер главы из имени файла
  const chapterNumber = parseInt(file.match(/chapter(\d+)\.mdx$/)[1]);
  
  // Получаем список изображений для этой главы
  const imageDir = `/home/nick/Projects/book-website/public/chapter-images/${chapterNumber}/`;
  if (fs.existsSync(imageDir)) {
    const imageFiles = fs.readdirSync(imageDir).filter(f => 
      f !== '.' && f !== '..' && 
      !f.endsWith('.docx') && 
      !f.endsWith('.txt') && 
      f !== `${chapterNumber}.` && // Исключаем подкаталог главы
      !f.match(/^\d+\.$/) // Исключаем подкаталоги типа "1.", "2.", и т.д.
    );
    
    // Удаляем все теги с неправильными путями (например, "/chapter-images/3/3.")
    const badPathRegex = new RegExp(`<ChapterImage[^>]*src="/chapter-images/${chapterNumber}/${chapterNumber}\\.[^"]*"[^>]*>\\s*\\n?`, 'g');
    content = content.replace(badPathRegex, '');
    
    // Заменяем неправильные теги компонентов на правильные
    content = content.replace(/<chapterimage/gi, '<ChapterImage');
    content = content.replace(/<\/chapterimage>/gi, '</ChapterImage>');
    
    // Добавляем правильные теги для каждого изображения в главе
    for (let i = 0; i < imageFiles.length; i++) {
      const imgFile = imageFiles[i];
      const imgTag = `\n<ChapterImage src="/chapter-images/${chapterNumber}/${imgFile}" alt="Иллюстрация к главе ${chapterNumber}, изображение ${i+1}" />\n`;

      // Проверяем, существует ли уже тег с таким изображением
      if (!content.includes(imgFile)) {
        content += imgTag;
      }
    }
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Исправлены пути к изображениям в главе: ${file}`);
}

console.log('Все пути к изображениям исправлены');