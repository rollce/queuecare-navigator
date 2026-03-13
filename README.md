# QueueCare Navigator

Healthcare-focused multi-page website for reducing clinic queue pain.

## Problem
People waste time in inappropriate queues without triage support.

## Solution
QueueCare adds:
- symptom-based urgency scoring,
- clinic matching by wait threshold,
- route-level UX for triage, clinic search, and policy FAQ.

## Pages
- `/` Overview
- `/triage` Symptom triage engine
- `/clinics` Clinic registry and urgency filtering
- `/faq` Safety and policy documentation

## API
- `POST /api/triage`
- `GET /api/clinics`

## UI Blocks
Built with **Material UI** (`AppBar`, `Tabs`, `Card`, `Table`, `Accordion`, `Alert`, `Form controls`).
