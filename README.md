## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend проекта в dev режиме
```

---

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev server
- `npm run start:vite` - Запуск frontend проекта на vite
- `npm run start:dev` - Запуск frontend проекта на webpack dev server + backend
- `npm run start:dev:vite` - Запуск frontend проекта на vite + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером
- `npm run test:unit` - Хапуск unit тестов с jest
- `npm run test:ui` - Хапуск скриншотных тестов с loki
- `npm run test:ui:ok` - Подтверждение новых скриншотов
- `npm run test:ui:ci` - Запуск скриншотных тестов в CI
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов
- `npm run test:ui:json` - Генерация json отчета для скриншотных тестов
- `npm run test:ui:html` - Генерация HTML отчета для скриншотных тестов
- `npm run storybook` - запуск Storybook
- `npm run storybook:build` - Сборка storybook билда
- `npm run prepare` - прекоммит хуки
- `npm run generate:slice` - Скрипт для генерации FSD слайсов

---

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

---

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

---

## Тесты

В проекте используются 4 вида тестов:

1. Обычные unit тесты на jest - `npm run test:unit`
2. Тесты на компоненты с React testing library -`npm run test:unit`
3. Скриншотное тестирование с loki `npm run test:ui`
4. e2e тестирование с Cypress `npm run test:e2e`

Подробнее о тестах - [документация тестирование](/docs/tests.md)
Хелперы - [helpers](/src/Shared/lib/tests/README.md)

tstest - сниппет для создания тестов
---

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin _eslint-plugin-avalserg-plugin_,
который содержит 3 правила

1. path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2. layer-imports - проверяет корректность использования слоев с точки зрения FSD
   (например widgets нельзя использовать в features и entitites)
3. public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix

##### Запуск линтеров

- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером

---

## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:

- `npm run storybook`

Подробнее о [Storybook](/docs/storybook.md)

Config
[config](/src/Shared/Config/storybook/README.md)

---

## Конфигурация проекта

Для разработки проект содержит 2 конфига:

1. Webpack - ./config/build
2. vite - vite.config.ts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в /config

- /config/babel - babel
- /config/build - конфигурация webpack
- /config/jest - конфигурация тестовой среды
- /config/storybook - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

---

## CI pipeline и pre commit хуки

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта и сторибука, линтинг.

В прекоммит хуках проверяем проект линтерами, конфиг в /.husky

---

### Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit.
По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter

Запросы на сервер отправляются с помощью [RTK query](/src/Shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется
[DynamicModuleLoader](/src/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

---
### Работа с feature-flags

Разрешено использование feature flags только с помощью хелпера toggleFeatures

в него передается объект с опциями 

{
   name: название фича-флага, 
   on: функция, которая отработает после Включения фичи 
   of: функция, которая отработает после ВЫключения фичи
}

Для автоматического удаления фичи использовать скрипт remove-feature.ts,
который принимает 2 аргумента
1. Название удаляемого фича-флага
2. Состояние (on\off)

----
## UI Kit

-[AppLink](/src/Shared/UI/AppLink/README.md)
-[Button](/src/Shared/UI/Button/README.md)
-[Loader](/src/Shared/UI/Loader/README.md)
-[Modal](/src/Shared/UI/Modal/README.md)
-[Portal](/src/Shared/UI/Portal/README.md)
-[Input](/src/Shared/UI/Input/README.md)
-[Text](/src/Shared/UI/Text/README.md)

## Widgets

-[Navbar](/src/Widgets/Navbar/README.md)
-[SideBar](/src/Widgets/SideBar/README.md)
-[PageLoader](/src/Widgets/PageLoader/README.md)
-[ErrorPage](/src/Widgets/ErrorPage/README.md)

## Сущности (entities)

- [Article](/src/Entities/Article/README.md)
- [Comment](/src/Entities/Comment/README.md)
- [Counter](/src/Entities/Counter/README.md)
- [Country](/src/Entities/Country/README.md)
- [Currency](/src/Entities/Currency/README.md)
- [Notification](/src/Entities/Notification/README.md)
- [Profile](/src/Entities/Profile/README.md)
- [Rating](/src/Entities/Rating/README.md)
- [User](/src/Entities/User/README.md)

## Фичи (features)

- [addCommentForm](/src/Features/addCommentForm/README.md)
- [articleEditForm](/src/Features/articleEditForm/README.md)
- [articleRating](/src/Features/articleRating/README.md)
- [articleRecommendationsList](/src/Features/articleRecommendationList/README.md)
- [AuthByUsername](/src/Features/AuthByUsername/README.md)
- [avatarDropdown](/src/Features/avatarDropdown/README.md)
- [editableProfileCard](/src/Features/editableProfileCard/README.md)
- [LangSwitcher](/src/Features/LangSwitcher/README.md)
- [notificationButton](/src/Features/notificationButton/README.md)
- [profileRating](/src/Features/profileRating/README.md)
- [ThemeSwitcher](/src/Features/ThemeSwitcher/README.md)
- [UI](/src/Features/UI/README.md)

## Providers

  Support routing 
-[AppRouter](/src/App/Providers/Router/README.md)
-[ErrorBoundary](/src/App/Providers/ErrorBoundary/README.md)

## App Component

-[App](/src/App/README.md)

## Global styles

-[Styles](/src/App/Styles/)
-[Variables](/src/App/Styles/Variables/global.scss)

## App Themes

-[Themes](/src/App/Styles/Themes/)

## Custom hooks

-[hooks](/src/Shared/lib/hooks/README.md)

## Custom helper components 

-[components](/src/Shared/lib/components/README.md)

## classNames helper

-[classNames](/src/Shared/lib/classNames/README.md)

## Snippets
rc - create react component file structure
sb - create storybook file structure
scss - create scss file structure 