const fs = require('fs');
const path = require('path');

// Content for chapter 2 (placeholder to be replaced with actual translation)
const chapter2UA = `---
title: "Розділ 2: Фібі на базарі"
order: 2
description: "Пригоди Фібі на базарі у неділю вранці."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Розділ 2: Фібі на базарі

Це текст-заповнювач для другого розділу. Основний вміст вашої книги буде тут. Будь ласка, додайте відповідний переклад з російської версії.`;

const chapter3UA = `---
title: "Розділ 3: Фібі та таємниця солодощів"
order: 3
description: "Фібі вирішує розслідувати зникнення смаколиків."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Розділ 3: Фібі та таємниця солодощів

Це текст-заповнювач для третього розділу. Основний вміст вашої книги буде тут. Будь ласка, додайте відповідний переклад з російської версії.`;

const chapter4UA = `---
title: "Розділ 4: Фібі та паркан"
order: 4
description: "Нова пригода Фібі пов'язана з дивним парканом у сусідів."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Розділ 4: Фібі та паркан

Це текст-заповнювач для четвертого розділу. Основний вміст вашої книги буде тут. Будь ласка, додайте відповідний переклад з російської версії.`;

const chapter5UA = `---
title: "Розділ 5: Фібі та дивний світ снів"
order: 5
description: "Фібі опиняється в дивному сні, де все можливо."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Розділ 5: Фібі та дивний світ снів

Це текст-заповнювач для п'ятого розділу. Основний вміст вашої книги буде тут. Будь ласка, додайте відповідний переклад з російської версії.`;

const chapter6UA = `---
title: "Розділ 6: Фібі та музика в повітрі"
order: 6
description: "Фібі вирішує, що звуки навколо таємничої сили."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Розділ 6: Фібі та музика в повітрі

Це текст-заповнювач для шостого розділу. Основний вміст вашої книги буде тут. Будь ласка, додайте відповідний переклад з російської версії.`;

const chapter7UA = `---
title: "Розділ 7: Фібі та дощова пригода"
order: 7
description: "Фібі виявляється посередині сильного дощу."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Розділ 7: Фібі та дощова пригода

Це текст-заповнювач для сьомого розділу. Основний вміст вашої книги буде тут. Будь ласка, додайте відповідний переклад з російської версії.`;

const chapter8UA = `---
title: "Розділ 8: Фібі та велика таємниця"
order: 8
description: "Фібі вирішує найбільшу таємницю в історії своєї вулиці."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Розділ 8: Фібі та велика таємниця

Це текст-заповнювач для восьмого розділу. Основний вміст вашої книги буде тут. Будь ласка, додайте відповідний переклад з російської версії.`;

const chapter9UA = `---
title: "Розділ 9: Фібі та нічна прогулянка"
order: 9
description: "Фібі вирішує відвідати місто вночі."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Розділ 9: Фібі та нічна прогулянка

Це текст-заповнювач для дев'ятого розділу. Основний вміст вашої книги буде тут. Будь ласка, додайте відповідний переклад з російської версії.`;

const chapter10UA = `---
title: "Розділ 10: Фібі прощається з друзями"
order: 10
description: "Останній день для Фібі та її друзів."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Розділ 10: Фібі прощається з друзями

Це текст-заповнювач для десятого розділу. Основний вміст вашої книги буде тут. Будь ласка, додайте відповідний переклад з російської версії.`;

// French chapters content
const chapter2FR = `---
title: "Chapitre 2: Phoebe au marché"
order: 2
description: "Les aventures de Phoebe au marché du dimanche matin."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Chapitre 2: Phoebe au marché

Ceci est un texte de remplissage pour le deuxième chapitre. Le contenu principal de votre livre sera ici. Veuillez ajouter la traduction appropriée depuis la version russe.`;

const chapter3FR = `---
title: "Chapitre 3: Phoebe et le mystère des friandises"
order: 3
description: "Phoebe décide d'enquêter sur la disparition des bonbons."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Chapitre 3: Phoebe et le mystère des friandises

Ceci est un texte de remplissage pour le troisième chapitre. Le contenu principal de votre livre sera ici. Veuillez ajouter la traduction appropriée depuis la version russe.`;

const chapter4FR = `---
title: "Chapitre 4: Phoebe et la clôture"
order: 4
description: "Une nouvelle aventure de Phoebe liée à une clôture étrange chez les voisins."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Chapitre 4: Phoebe et la clôture

Ceci est un texte de remplissage pour le quatrième chapitre. Le contenu principal de votre livre sera ici. Veuillez ajouter la traduction appropriée depuis la version russe.`;

const chapter5FR = `---
title: "Chapitre 5: Phoebe et le monde étrange des rêves"
order: 5
description: "Phoebe se retrouve dans un rêve étrange où tout est possible."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Chapitre 5: Phoebe et le monde étrange des rêves

Ceci est un texte de remplissage pour le cinquième chapitre. Le contenu principal de votre livre sera ici. Veuillez ajouter la traduction appropriée depuis la version russe.`;

const chapter6FR = `---
title: "Chapitre 6: Phoebe et la musique dans l'air"
order: 6
description: "Phoebe décide que les sons autour d'elle ont un pouvoir mystérieux."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Chapitre 6: Phoebe et la musique dans l'air

Ceci est un texte de remplissage pour le sixième chapitre. Le contenu principal de votre livre sera ici. Veuillez ajouter la traduction appropriée depuis la version russe.`;

const chapter7FR = `---
title: "Chapitre 7: Phoebe et l'aventure sous la pluie"
order: 7
description: "Phoebe se retrouve au beau milieu d'une forte pluie."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Chapitre 7: Phoebe et l'aventure sous la pluie

Ceci est un texte de remplissage pour le septième chapitre. Le contenu principal de votre livre sera ici. Veuillez ajouter la traduction appropriée depuis la version russe.`;

const chapter8FR = `---
title: "Chapitre 8: Phoebe et le grand mystère"
order: 8
description: "Phoebe résout le plus grand mystère de l'histoire de sa rue."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Chapitre 8: Phoebe et le grand mystère

Ceci est un texte de remplissage pour le huitième chapitre. Le contenu principal de votre livre sera ici. Veuillez ajouter la traduction appropriée depuis la version russe.`;

const chapter9FR = `---
title: "Chapitre 9: Phoebe et la promenade nocturne"
order: 9
description: "Phoebe décide de visiter la ville la nuit."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Chapitre 9: Phoebe et la promenade nocturne

Ceci est un texte de remplissage pour le neuvième chapitre. Le contenu principal de votre livre sera ici. Veuillez ajouter la traduction appropriée depuis la version russe.`;

const chapter10FR = `---
title: "Chapitre 10: Phoebe dit au revoir à ses amis"
order: 10
description: "Le dernier jour pour Phoebe et ses amis."
---

import ChapterImage from '../../../components/ChapterImage.astro'

# Chapitre 10: Phoebe dit au revoir à ses amis

Ceci est un texte de remplissage pour le dixième chapitre. Le contenu principal de votre livre sera ici. Veuillez ajouter la traduction appropriée depuis la version russe.`;

// Write Ukrainian chapters
const uaDir = '/home/nick/Projects/book-website/src/content/book/ua/';
fs.writeFileSync(path.join(uaDir, 'chapter2.mdx'), chapter2UA);
fs.writeFileSync(path.join(uaDir, 'chapter3.mdx'), chapter3UA);

for (let i = 4; i <= 10; i++) {
  const chapterContent = eval(`chapter${i}UA`);
  fs.writeFileSync(path.join(uaDir, `chapter${i}.mdx`), chapterContent);
}

// Write French chapters
const frDir = '/home/nick/Projects/book-website/src/content/book/fr/';
fs.writeFileSync(path.join(frDir, 'chapter2.mdx'), chapter2FR);
fs.writeFileSync(path.join(frDir, 'chapter3.mdx'), chapter3FR);

for (let i = 4; i <= 10; i++) {
  const chapterContent = eval(`chapter${i}FR`);
  fs.writeFileSync(path.join(frDir, `chapter${i}.mdx`), chapterContent);
}

console.log('Все дополнительные файлы глав созданы с заглушками для перевода.');