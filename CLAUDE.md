@AGENTS.md

# Правила работы в этом проекте

## Автономность

- Выполняй все задачи до конца без пауз и подтверждений
- Не задавай уточняющих вопросов — принимай разумные решения самостоятельно
- После каждой завершённой задачи делай git commit
- Сообщай результат одним итоговым сообщением в конце

## Домен и окружение

- Основной домен сайта: `https://xn----itbahmwicjfkkc.xn--p1ai` (презент-строй.рф)
- Медиафайлы (изображения) живут на `https://present-stroy.ru/netcat_files/` — это CDN старого сайта, не трогать
- `NEXT_PUBLIC_SITE_URL` = `https://xn----itbahmwicjfkkc.xn--p1ai`
- Email для заявок и SMTP: `present-stroy@inbox.ru`, хост `smtp.inbox.ru:465`
- `.env.local` не коммитится — содержит SMTP-пароль

## Стек

- Next.js 16.2.4 (App Router, params — Promise, await обязателен)
- React 19, Tailwind v4
- Цвета: primary `#1B3A5C`, accent `#C19A52`, warm `#F5F0E8`, border `#E8E4DB`

## Git

- Ветка разработки: `feat/volzhsky-bereg`
- Коммить конкретными атомарными коммитами после каждой задачи
- Не пушить без явной просьбы
