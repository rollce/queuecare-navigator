# QueueCare Navigator

QueueCare Navigator is a healthcare queue-assistance web app that estimates urgency from symptoms and recommends clinics with acceptable waiting times.

Live: https://queue.rollsev.work

## Why this project exists

People frequently spend time in the wrong queue due to weak triage support. This project models a decision-support flow for first-step clinic routing.

## Product goals

- Estimate urgency quickly from a small symptom form
- Recommend clinics based on urgency and wait thresholds
- Provide a clear explanation message for next action
- Keep triage and clinic-discovery flows easy to use

## Pages and user flows

- `/` Overview
  - Product context and impact metrics
- `/triage`
  - Submit symptoms and get urgency + recommendations
- `/clinics`
  - Browse clinics and filter by urgency profile
- `/faq`
  - Explain urgency logic and safety boundaries

## API surface

### `POST /api/triage`
Input fields:
- `painLevel` (numeric)
- `fever` (boolean)
- `breathingIssue` (boolean)
- `age` (1..120)

Scoring logic:
- `score = painLevel`
- `+2` if fever
- `+4` if breathing issue
- `+1` if age >= 65

Urgency mapping:
- `high` if score >= 8
- `medium` if score >= 5
- `low` otherwise

Output:
- `urgency`, `score`, `message`, `recommendations`

### `GET /api/clinics`
- No params: returns all clinics
- With `?urgency=low|medium|high`: returns recommended subset

Recommendation thresholds by urgency:
- `high`: wait <= 30 min
- `medium`: wait <= 45 min
- `low`: wait <= 60 min

## Data model (demo)

Clinic fields:
- `id`, `name`, `district`, `specialties`, `waitMinutes`, `openNow`

## UI / UX stack

- Material UI (`AppBar`, `Tabs`, `Card`, `Table`, `Accordion`, `Alert`, form controls)
- Tailwind CSS support styling
- Next.js App Router pages for clear journey separation

## Technical stack

- Next.js 16 (App Router + Route Handlers)
- TypeScript
- Tailwind CSS 4
- Material UI

## Run locally

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Quality checks

```bash
npm run lint
npm run build
```

## Deployment

- Deployed on Railway
- Public domain: `queue.rollsev.work`

## Portfolio value

QueueCare demonstrates practical decision-logic APIs, healthcare-oriented triage UX, and explainable routing recommendations.

## Roadmap

- Add geolocation and travel-time weighting
- Add clinic capacity feed integration
- Add triage disclaimers by jurisdiction and language support
