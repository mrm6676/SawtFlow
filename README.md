# SawtFlow AI

> **Arabic Voice Intelligence for approved business automation**
> ذكاء صوتي عربي لأتمتة إجراءات الأعمال بعد اعتمادها

SawtFlow AI is a voice-intelligence workspace for businesses that need to understand Arabic customer conversations, extract intent and order details, retrieve business context, and prepare safe actions with human approval and auditability.

SawtFlow AI هو نظام ذكاء صوتي يساعد الشركات على فهم محادثات العملاء باللغة العربية، بما في ذلك اللهجات العامية والمحادثات العربية-الإنجليزية المختلطة، ثم استخراج النية وتفاصيل الطلب، واسترجاع المعلومات، وتجهيز الإجراءات الآمنة بعد موافقة بشرية.

[![Arabic](https://img.shields.io/badge/Language-Arabic%20%2B%20English-0f766e)](#language-support) [![Frontend](https://img.shields.io/badge/Frontend-Vanilla%20JS-f59e0b)](#technology) [![Database](https://img.shields.io/badge/Database-MySQL%208-2563eb)](#database-architecture) [![Safety](https://img.shields.io/badge/Actions-Human%20approval-dc2626)](#human-in-the-loop)

---

## Overview | نظرة عامة

SawtFlow turns an Arabic voice message into an explainable business workflow:

```text
Voice input → Transcription → Intent understanding → Business lookup → Suggested action → Human approval → Audit event
```

The interactive Studio demonstrates this staged experience:

1. **Input** — Upload an audio recording or use a microphone recording.
2. **Understand** — Transcribe speech and review or correct recognition output.
3. **Act** — Detect intent, extract the order identifier, and retrieve order context.
4. **Approve** — Review the proposed response or business action before execution.

The interface is designed for Arabic-first experiences with RTL support, bilingual labels, light/dark themes, responsive layouts, and progressive interaction animations.

## Core capabilities | القدرات الأساسية

- Arabic dialect and colloquial speech workflows.
- Arabic-English mixed speech support.
- Transcript review and correction while preserving meaning.
- Intent detection for order status, cancellation, and modification scenarios.
- Order ID extraction from natural-language customer messages.
- Order lookup and edge-case demonstrations, including delayed shipments, cancelled orders, returns, address issues, and customs clearance.
- Human-in-the-loop approval before consequential actions such as cancellation or modification.
- Audit-ready action model with idempotency, before/after snapshots, correlation IDs, and failure states.
- Arabic/English switching with RTL-aware presentation.
- Light/dark theme switching with smooth transitions.
- Responsive Studio interactions for desktop, tablet, and mobile layouts.

## Example workflow | مثال على سير العمل

A customer may say:

> أين طلبي؟ قيل لي إنه سيصل اليوم.

SawtFlow can turn this into an explainable result:

- **Intent:** Order status / حالة الطلب
- **Language:** Arabic / العربية
- **Urgency:** Normal / عادية
- **Extracted detail:** Order identifier, when present
- **Business context:** Delivery status and latest order information
- **Response:** A context-aware Arabic or English reply
- **Approval:** Required before cancellation or modification

For an action request such as cancellation or address modification, the agent prepares a request rather than performing the action immediately.

## Repository structure | بنية المستودع

```text
.
├── database/
│   └── schema.sql             # MySQL 8 schema for orders, action requests, and audit log
├── site/
│   ├── index.html             # Public SawtFlow landing page
│   ├── app.js                 # Homepage interactions and language/theme controls
│   ├── styles.css             # Global visual system and responsive styles
│   ├── manus-routes.json      # Published page-route manifest
│   ├── assets/
│   │   └── sawtflow-mark.svg  # SawtFlow brand mark
│   └── studio/
│       ├── index.html         # Interactive Studio workspace
│       ├── studio.js          # Studio workflow, intent detection, and order lookup logic
│       ├── studio.css         # Studio-specific styles and animations
│       └── mock-orders.json   # Local demonstration fixtures
├── app.config.ts              # Webdev project metadata
├── TODO.md                    # Current implementation outcomes
└── README.md
```

## Run locally | التشغيل محليًا

The current frontend is a static site and can be previewed with Python's built-in HTTP server:

```bash
git clone https://github.com/mrm6676/SawtFlow.git
cd SawtFlow
python3 -m http.server 3000 --directory site
```

Open:

- Homepage: <http://localhost:3000/>
- Studio: <http://localhost:3000/studio/>

The repository can also be served by any static hosting provider that supports an `index.html` entry point.

### Local development notes

- Keep browser-facing API URLs relative when adding a backend.
- Do not place database credentials or speech-provider keys in `site/`.
- Use a server-side API for database access and external speech services.
- Keep `/manus-routes.json` synchronized whenever page routes change.

## Studio workflow | مساحة Studio

The Studio is organized as a controlled pipeline rather than a single “run action” button:

### 1. Input

Upload an audio file or record voice through the microphone. The interface provides a preview before submission so the operator can confirm the selected recording.

### 2. Understand

Produce a transcript, expose recognition output for correction, preserve the customer’s meaning, and identify language and urgency metadata.

### 3. Act

Classify the customer intent and extract relevant details such as an order number. Query the current order source and show evidence before drafting a response.

### 4. Approve

Display the proposed response or consequential operation. Cancellation and modification must remain pending until an authorized human approves them.

## Database architecture | بنية قاعدة البيانات

`database/schema.sql` targets **MySQL 8.0+** and uses `utf8mb4` for Arabic-compatible storage. It defines three core tables:

### `orders`

Stores provider order identifiers, lifecycle and fulfillment status, payment status, safe delivery information, provider payloads, optimistic versioning, and timestamps.

### `order_action_requests`

Represents a requested cancellation or modification independently from the order. It records approval state, requested changes, before/after snapshots, expiry, failure details, and a unique idempotency key.

### `audit_log`

Stores append-only events for lookups, approvals, completions, and failures. Events include actor information, order and action references, correlation IDs, metadata, and hashed request identity fields.

Apply the schema in a controlled MySQL environment:

```bash
mysql --default-character-set=utf8mb4 < database/schema.sql
```

The schema creates a database named `sawtflow` unless the deployment process supplies an existing database and migration strategy.

## Human-in-the-loop | الموافقة البشرية

SawtFlow treats voice understanding and business execution as separate concerns. A transcript or intent classification may be automated, but a consequential business action must pass through an approval gate.

Recommended server-side sequence:

```text
Create action request
  → Validate actor and order state
  → Show requested changes and evidence
  → Approve or reject
  → Execute with transaction/locking
  → Write completion or failure event
```

The browser should never connect directly to MySQL. A production server should:

- Authenticate and authorize the actor.
- Validate the order state and allowed modification fields.
- Use a transaction and appropriate row locking for writes.
- Enforce idempotency for retries.
- Record lookup, approval, rejection, completion, and failure events.
- Support dry-run provider mode before enabling real cancellation or modification.

## Technology | التقنيات

- HTML5, CSS3, and vanilla JavaScript for the current frontend.
- MySQL 8.0+ for the planned production order and audit data layer.
- RTL-aware Arabic UI with bilingual English support.
- Webdev-managed project configuration and preview workflow.
- Server-side speech and business-tool integrations should be added behind APIs, not embedded in client-side code.

## Production integration roadmap | خارطة التكامل

The current Studio includes local demonstration fixtures. The next production integration should:

1. Replace `site/studio/mock-orders.json` reads with server endpoints such as `GET /api/orders/:id`.
2. Add authenticated `POST` endpoints for action requests and approval decisions.
3. Persist order, action, and audit records using `database/schema.sql` or an equivalent migration system.
4. Connect server-side speech transcription for uploaded or recorded audio.
5. Add provider adapters for order lookup, cancellation, and modification.
6. Add structured observability using correlation IDs and safe error responses.
7. Run migrations and integration tests in a controlled environment before enabling live actions.

## Security and privacy | الأمان والخصوصية

- Never commit API keys, database passwords, access tokens, or provider credentials.
- Treat provider payloads and customer transcripts as untrusted input.
- Minimize stored personal data and define retention rules for recordings and transcripts.
- Hash request identity fields where an audit trail needs correlation without retaining raw network metadata.
- Redact payment-card data and other unnecessary sensitive information.
- Keep destructive or irreversible actions behind authorization and human approval.
- Use HTTPS in production and secure, server-managed cookies where authentication is introduced.

## Status | الحالة

SawtFlow AI is an evolving product prototype transitioning from local Studio demonstrations to a production-ready, database-backed voice automation architecture. The visual website, Studio workflow, local fixtures, SQL schema, approval model, and audit design are in place; live provider integrations and production deployment configuration should be completed for the target business environment.

## License

Choose and add a license before public distribution. Until a license file is added, the repository’s code should be treated as all-rights-reserved by default.

---

## العربية

### ما هو SawtFlow؟

SawtFlow AI هو وكيل ذكاء صوتي عربي للشركات. يفهم اللهجات العامية والمحادثات المختلطة بين العربية والإنجليزية، ويصحح أخطاء التعرف على الكلام مع الحفاظ على المعنى، ثم يحدد نية العميل ويستخرج التفاصيل المهمة ويربطها بإجراءات الأعمال بعد موافقة بشرية.

### لماذا هذا التصميم؟

يفصل SawtFlow بين أربع مراحل واضحة:

1. **الإدخال:** رفع أو تسجيل رسالة صوتية مع إمكانية معاينتها.
2. **الفهم:** إنشاء النص ومراجعته وتصحيح الأخطاء.
3. **الإجراء:** تحديد النية واستخراج رقم الطلب واسترجاع بياناته.
4. **الاعتماد:** مراجعة الرد أو الإجراء والموافقة عليه قبل التنفيذ.

### تشغيل النسخة المحلية

```bash
git clone https://github.com/mrm6676/SawtFlow.git
cd SawtFlow
python3 -m http.server 3000 --directory site
```

ثم افتح:

- <http://localhost:3000/>
- <http://localhost:3000/studio/>

### قاعدة البيانات

يحتوي الملف `database/schema.sql` على مخطط MySQL 8 للجداول التالية:

- `orders` لتخزين الطلبات وحالاتها.
- `order_action_requests` لطلبات الإلغاء والتعديل وحالات الموافقة والتنفيذ.
- `audit_log` لسجل تدقيق غير قابل للتعديل أو الحذف من خلال مستخدم التطبيق.

لا ينبغي للواجهة الأمامية الاتصال بقاعدة البيانات مباشرة. يجب تنفيذ الوصول من خلال API خادم آمن مع مصادقة، معاملات، منع تكرار الطلبات، وسجل تدقيق كامل.

### المساهمة

عند إضافة ميزة جديدة، حافظ على دعم العربية واتجاه RTL، ولا تضع أسرارًا أو مفاتيح API داخل ملفات `site/`. أضف اختبارات أو توثيقًا عند تغيير منطق النية أو تدفق الموافقة أو مخطط قاعدة البيانات.
