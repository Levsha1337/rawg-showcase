# rawg.io showcase

Based on next.js

---

## Installation & running

First of all you need to create `config.json` in app folder.

Inside config you need to define rawg.io API-key:

```
{
    "api_key": "YOUR_API_KEY"
}
```

Then just run `npm i && npm start` to install all of node modules, create production-ready build and run http server on port 3000.

---

## Technical Requirments

---

## `/` - главная, каталог игр:

### Функционал

✅ Пагинация (в идеале, бесконечный скролл)

✅ Сортировка по: рейтингу и дате релиза игры (в обе стороны)

✅ Фильтрация по платформам

✅ Поиск по названию

---

### Содержимое каждой “плитки” игры:

✅ Название

✅ Постер

✅ Рейтинг

✅ Дата релиза

---

## `/game/[slug]` - страница игры, на которую можно попасть, кликнув на плитку игры в каталоге, должна содержать более полную информацию об игре (помимо имевшейся на плитке):

---

✅ Описание

✅ Ссылка на сайт игры

❌ Слайдер со скриншотами игры

---

## Требования:

✅ Реализация на React

✅ Код на ES6 (без TypeScript)

✅ Адаптивная mobile-first вёрстка

✅ Сборка на webpack (ваш пример должен запуститься через npm i && npm start)

✅ Вёрстка с нуля без использования UI-библиотек типа MaterialUI (нам важнее оценить, как вы верстаете с нуля, чем итоговые “рюшки” и красота)

---

Особым плюсом будет:

✅ Реализация в виде SSR-приложения на Next.js или десктоп-приложения на Electron

✅ Вёрстка с использованием styled components
