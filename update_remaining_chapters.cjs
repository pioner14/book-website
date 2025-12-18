const fs = require('fs');
const path = require('path');

// Директория с главами
const chaptersDir = '/home/nick/Projects/book-website/src/content/book/ru';

// Обновляем оставшиеся главы с добавлением изображений
function updateRemainingChapters() {
  // Главы 6-10
  for (let i = 6; i <= 10; i++) {
    const filePath = path.join(chaptersDir, `chapter${i}.mdx`);
    
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Добавляем изображение в начало главы
      const firstImage = `/chapter-images/${i}/first-image.jpg`; // Заглушка для обозначения, что здесь будет изображение
      
      // Проверяем, есть ли уже теги изображений
      if (!content.includes('<figure class="my-8 flex justify-center">')) {
        // Добавляем изображение после заголовка
        content = content.replace(
          /^(# .+?\n)/m,
          `$1\n<figure class="my-8 flex justify-center">\n  <img \n    src="${firstImage}"\n    alt="Иллюстрация к главе ${i}"\n    class="max-w-full h-auto rounded-lg shadow-md"\n  />\n</figure>\n\n`
        );
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`Обновлена глава ${i}`);
    } else {
      console.log(`Файл главы ${i} не найден`);
    }
  }
}

updateRemainingChapters();