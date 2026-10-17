const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const form = document.querySelector('#demo-form');
const message = document.querySelector('#form-message');
const languageToggle = document.querySelector('[data-lang-toggle]');
const themeToggle = document.querySelector('[data-theme-toggle]');
const audioUpload = document.querySelector('#audio-upload');
const sampleVoice = document.querySelector('#sample-voice');
const transcriptInput = document.querySelector('#demo-transcript-input');
const editTranscript = document.querySelector('#edit-transcript');
const retrieveOrder = document.querySelector('#retrieve-order');
const approveReply = document.querySelector('#approve-reply');
const demoEvidence = document.querySelector('#demo-evidence');
const demoApproval = document.querySelector('#demo-approval');
const demoResponse = document.querySelector('#demo-response');
const draftResponse = document.querySelector('#draft-response');

const translations = {
  en: {
    nav: ['Capabilities', 'How it works', 'Use cases', 'Trust'],
    mobileNav: ['Capabilities', 'How it works', 'Use cases', 'Trust', 'Talk to an expert'],
    navCta: 'Talk to an expert <span aria-hidden="true">↗</span>',
    heroEyebrow: 'ARABIC VOICE INTELLIGENCE',
    heroTitle: 'Speech that makes<br><em>business move.</em>',
    heroArabic: 'فهمٌ أدق. قراراتٌ أوثق. عملٌ أسرع.',
    heroIntro: 'SawtFlow understands how your customers really speak—across Arabic dialects, English switches, noisy calls, and the intent hiding between the words.',
    heroButton: 'See SawtFlow in action <span aria-hidden="true">→</span>',
    heroFlow: 'Explore the flow <span aria-hidden="true">↓</span>',
    proof: [['Dialect-aware', 'Arabic from the real world'], ['Human-in-control', 'Approved actions only']],
    marquee: ['Arabic dialects', 'Mixed-language speech', 'Intent intelligence', 'Verified automation', 'Arabic dialects', 'Mixed-language speech', 'Intent intelligence', 'Verified automation'],
    capabilityEyebrow: 'BUILT FOR THE WAY PEOPLE SPEAK',
    capabilityTitle: 'Every accent.<br><em>One reliable intent.</em>',
    capabilityIntro: 'SawtFlow does more than transcribe. It turns conversational Arabic into a dependable operating signal your teams and systems can use.',
    capabilities: [['Hear the nuance', 'Recognize Arabic dialects and Arabic-English mixed speech without forcing customers into rigid scripts.'], ['Resolve, don’t rewrite', 'Correct recognition errors while retaining what the speaker actually meant—and the context around it.'], ['Make intent actionable', 'Extract the request, people, dates, references, and details that make a business action possible.']],
    workflowEyebrow: 'FROM VOICE TO VERIFIED OUTCOME',
    workflowTitle: 'Built to move<br>with <em>certainty.</em>',
    workflowIntro: 'One continuous flow connects the customer’s voice to the business response—without skipping the moments that require accuracy or control.',
    flow: [['Listen', 'Capture a real customer conversation in Arabic, English, or both.'], ['Interpret', 'Resolve speech errors, identify intent, and extract the signal that matters.'], ['Connect', 'Retrieve information from the right business tool or start an approved task.'], ['Verify', 'Check the action, confirm its result, and keep the human approval boundary intact.'], ['Respond', 'Return an accurate, context-aware answer that gives the customer a clear next step.']],
    usecaseEyebrow: 'WHERE THE FLOW PAYS OFF',
    usecaseIntro: 'Designed for businesses where every conversation should move work forward.',
    usecases: [['Customer service', 'Understand the issue the first time, identify the case, and give agents the context to resolve it.'], ['Booking & appointments', 'Capture dates, names, and requests from natural voice conversations—then verify the right next action.'], ['Order inquiries', 'Connect the spoken request to order data and respond with current, relevant information.'], ['Internal operations', 'Turn frontline notes and voice requests into structured tasks with the detail teams need.']],
    trustEyebrow: 'CONFIDENT AUTOMATION',
    trustTitle: 'Control stays<br><em>explicit.</em>',
    trustIntro: 'Your customer conversations carry context. SawtFlow protects it with a deliberate action layer: retrieve, check, confirm, then respond.',
    trustLink: 'Talk through your workflow <span aria-hidden="true">→</span>',
    trustItems: [['Approved actions', 'Automation respects the actions and permissions your business explicitly allows.'], ['Context before confidence', 'Responses reflect the conversation, the retrieved information, and the action result.'], ['Confirmation built in', 'Verification is a part of the flow—not an afterthought when it matters most.']],
    demoEyebrow: 'READY WHEN YOUR VOICE IS',
    demoTitle: 'Bring the next<br>conversation <em>forward.</em>',
    demoIntro: 'Tell us where Arabic customer conversations are slowing your business down. We’ll show you where SawtFlow can create a more reliable next step.',
    contactNote: 'Built for teams that need accuracy before action.',
    formHeading: 'REQUEST A DEMO',
    formLabels: ['Name', 'Work email', 'What would you like to automate?'],
    formPlaceholders: ['Your name', 'you@company.com', 'e.g. Arabic booking calls, order inquiries...'],
    formButton: 'Request a conversation <span aria-hidden="true">→</span>',
    formFootnote: 'This preview saves requests locally; connect a CRM or inbox for production delivery.',
    footer: 'Arabic voice intelligence for business automation.',
    backToTop: 'Back to top ↑',
    languageLabel: 'عربي',
    languageAria: 'Switch to Arabic',
    themeLabel: 'Dark',
    themeAria: 'Switch to dark mode',
    formThanks: 'Thanks{, name}. This preview validates the inquiry flow; connect it to your CRM or inbox to receive live requests.'
  },
  ar: {
    nav: ['القدرات', 'كيف تعمل', 'حالات الاستخدام', 'الثقة'],
    mobileNav: ['القدرات', 'كيف تعمل', 'حالات الاستخدام', 'الثقة', 'تحدث مع خبير'],
    navCta: 'تحدث مع خبير <span aria-hidden="true">↗</span>',
    heroEyebrow: 'ذكاء صوتي عربي',
    heroTitle: 'صوتٌ يفهم.<br><em>وأعمالٌ تتحرّك.</em>',
    heroArabic: 'فهمٌ أدق. قراراتٌ أوثق. عملٌ أسرع.',
    heroIntro: 'يفهم SawtFlow طريقة حديث عملائك الحقيقية—من اللهجات العربية إلى المزج بين العربية والإنجليزية، والضوضاء، والنية المختبئة بين الكلمات.',
    heroButton: 'شاهد SawtFlow في العمل <span aria-hidden="true">→</span>',
    heroFlow: 'استكشف التدفق <span aria-hidden="true">↓</span>',
    proof: [['يفهم اللهجات', 'عربية من الواقع'], ['الإنسان في دائرة التحكم', 'إجراءات معتمدة فقط']],
    marquee: ['اللهجات العربية', 'حديث عربي-إنجليزي', 'ذكاء النية', 'أتمتة موثوقة', 'اللهجات العربية', 'حديث عربي-إنجليزي', 'ذكاء النية', 'أتمتة موثوقة'],
    capabilityEyebrow: 'مصمم للطريقة التي يتحدث بها الناس',
    capabilityTitle: 'كل لهجة.<br><em>نية واحدة موثوقة.</em>',
    capabilityIntro: 'لا يكتفي SawtFlow بتحويل الصوت إلى نص، بل يحوّل المحادثة العربية إلى إشارة تشغيلية موثوقة تستخدمها فرقك وأنظمتك.',
    capabilities: [['افهم التفاصيل', 'تعرّف على اللهجات العربية والمزج بين العربية والإنجليزية دون إجبار العملاء على نصوص جامدة.'], ['صحّح دون تغيير المعنى', 'صحّح أخطاء التعرّف مع الحفاظ على ما قصده المتحدث فعلاً والسياق المحيط به.'], ['حوّل النية إلى إجراء', 'استخرج الطلب والأسماء والتواريخ والمراجع والتفاصيل التي تجعل الإجراء ممكناً.']],
    workflowEyebrow: 'من الصوت إلى نتيجة موثوقة',
    workflowTitle: 'مصمم للتحرك<br><em>بيقين.</em>',
    workflowIntro: 'يربط تدفق واحد متصل صوت العميل باستجابة العمل، دون تجاوز اللحظات التي تتطلب الدقة أو التحكم.',
    flow: [['استمع', 'التقط محادثة حقيقية بالعربية أو الإنجليزية أو بهما معاً.'], ['فسّر', 'صحّح أخطاء الصوت، وحدد النية، واستخرج الإشارة المهمة.'], ['اربط', 'استرجع المعلومات من أداة العمل المناسبة أو ابدأ إجراءً معتمداً.'], ['تحقق', 'افحص الإجراء وأكّد نتيجته وحافظ على حدود موافقة الإنسان.'], ['استجب', 'قدّم إجابة دقيقة وواعية بالسياق تمنح العميل الخطوة التالية بوضوح.']],
    usecaseEyebrow: 'حيث يصنع التدفق فرقاً',
    usecaseIntro: 'مصمم للأعمال التي يجب أن تدفع كل محادثة فيها العمل إلى الأمام.',
    usecases: [['خدمة العملاء', 'افهم المشكلة من المرة الأولى، وحدد الحالة، وامنح الفريق السياق اللازم لحلها.'], ['الحجوزات والمواعيد', 'التقط التواريخ والأسماء والطلبات من المحادثات الطبيعية، ثم تحقّق من الإجراء التالي.'], ['استفسارات الطلبات', 'اربط الطلب المنطوق ببيانات الطلب وقدّم معلومات حالية وذات صلة.'], ['العمليات الداخلية', 'حوّل ملاحظات الخط الأمامي والطلبات الصوتية إلى مهام منظمة بالتفاصيل التي يحتاجها الفريق.']],
    trustEyebrow: 'أتمتة بثقة',
    trustTitle: 'التحكم يبقى<br><em>واضحاً.</em>',
    trustIntro: 'تحمل محادثات العملاء سياقاً مهماً. يحميه SawtFlow بطبقة إجراءات متعمدة: استرجع، افحص، أكّد، ثم استجب.',
    trustLink: 'ناقش سير عملك <span aria-hidden="true">→</span>',
    trustItems: [['إجراءات معتمدة', 'تحترم الأتمتة الإجراءات والصلاحيات التي يسمح بها عملك صراحةً.'], ['السياق قبل الثقة', 'تعكس الإجابات المحادثة والمعلومات المسترجعة ونتيجة الإجراء.'], ['التأكيد مدمج', 'التحقق جزء من التدفق، وليس خطوة لاحقة عندما تصبح المخاطر أعلى.']],
    demoEyebrow: 'جاهز عندما يكون صوتك',
    demoTitle: 'ادفع بالمحادثة<br><em>التالية إلى الأمام.</em>',
    demoIntro: 'أخبرنا أين تبطئ محادثات العملاء بالعربية عملك. سنوضح لك أين يصنع SawtFlow خطوة تالية أكثر موثوقية.',
    contactNote: 'مصمم للفرق التي تحتاج الدقة قبل الإجراء.',
    formHeading: 'اطلب عرضاً تجريبياً',
    formLabels: ['الاسم', 'البريد الإلكتروني للعمل', 'ما الذي ترغب في أتمتته؟'],
    formPlaceholders: ['اسمك', 'you@company.com', 'مثال: مكالمات حجز عربية، استفسارات الطلبات...'],
    formButton: 'اطلب محادثة <span aria-hidden="true">→</span>',
    formFootnote: 'يحفظ هذا العرض الطلبات محلياً؛ اربطه بـ CRM أو بريدك للتشغيل الفعلي.',
    footer: 'ذكاء صوتي عربي لأتمتة الأعمال.',
    backToTop: 'العودة إلى الأعلى ↑',
    languageLabel: 'EN',
    languageAria: 'Switch to English',
    themeLabel: 'داكن',
    themeAria: 'التبديل إلى الوضع الداكن',
    formThanks: 'شكراً{، name}. هذا العرض يختبر تدفق الطلب؛ اربطه بـ CRM أو بريدك لاستقبال الطلبات الحية.'
  }
};

function setText(selector, value, useHtml = false) {
  const node = document.querySelector(selector);
  if (node) node[useHtml ? 'innerHTML' : 'textContent'] = value;
}

function setAll(selector, values, useHtml = false) {
  document.querySelectorAll(selector).forEach((node, index) => {
    if (values[index] !== undefined) node[useHtml ? 'innerHTML' : 'textContent'] = values[index];
  });
}

function setAgentDemoLanguage(language) {
  const isArabic = language === 'ar';
  setText('#agent-demo .agent-demo-head .eyebrow', isArabic ? 'عرض الوكيل المباشر' : 'LIVE AGENT DEMO');
  setText('.demo-status', `<i></i> ${isArabic ? 'بيانات تجريبية' : 'SAMPLE DATA'}`, true);
  setText('#upload-label', isArabic ? 'ارفع تسجيلاً عربياً' : 'Upload Arabic voice');
  setText('#sample-voice', isArabic ? 'استخدم رسالة تجريبية' : 'Use sample message');
  setText('.demo-kicker', `${isArabic ? 'النص المفرغ' : 'TRANSCRIPT'} <span id="transcript-state">${isArabic ? 'جاهز' : 'READY'}</span>`, true);
  setText('#edit-transcript', isArabic ? 'صحّح النص' : 'Correct transcript');
  setAll('.demo-intent-grid > div span', isArabic ? ['النية', 'اللغة', 'الأولوية'] : ['INTENT', 'LANGUAGE', 'URGENCY']);
  setAll('.demo-intent-grid > div strong', isArabic ? ['حالة الطلب', 'عربي / إنجليزي', 'عادية'] : ['Order status', 'Arabic / English', 'Normal']);
  setText('.demo-action-card span', isArabic ? 'إجراء معتمد' : 'APPROVED ACTION');
  setText('.demo-action-card strong', isArabic ? 'استرجاع حالة الطلب' : 'Retrieve order status');
  setText('#retrieve-order', `${isArabic ? 'تشغيل البحث' : 'Run lookup'} <span aria-hidden="true">→</span>`, true);
  setText('.evidence-heading span', isArabic ? 'الأدلة المسترجعة' : 'RETRIEVED EVIDENCE');
  setText('.evidence-heading b', isArabic ? 'قاعدة الطلبات' : 'ORDER DB');
  setText('.demo-approval span', isArabic ? 'موافقة بشرية مطلوبة' : 'HUMAN APPROVAL REQUIRED');
  setText('.demo-approval strong', isArabic ? 'راجع الرد المقترح قبل الإرسال.' : 'Review the drafted reply before sending.');
  setText('#approve-reply', `${isArabic ? 'اعتماد المسودة' : 'Approve draft'} <span aria-hidden="true">✓</span>`, true);
  setText('.demo-response > span', isArabic ? 'رد مقترح' : 'DRAFT RESPONSE');
  if (draftResponse) draftResponse.textContent = isArabic ? 'طلبك قيد الشحن، ومن المتوقع أن يصل اليوم قبل الساعة 6:00 مساءً.' : 'Your order is in transit and is expected to arrive today by 6:00 PM.';
}

function applyLanguage(language) {
  const content = translations[language];
  const isArabic = language === 'ar';
  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  document.body.classList.toggle('is-arabic', isArabic);
  setAll('.desktop-nav a', content.nav);
  setAll('.mobile-menu a', content.mobileNav);
  setText('.nav-cta', content.navCta, true);
  setText('.hero .eyebrow', content.heroEyebrow);
  setText('.hero h1', content.heroTitle, true);
  setText('.hero-arabic', content.heroArabic);
  setText('.hero-intro', content.heroIntro);
  setText('.button-primary', content.heroButton, true);
  setText('.hero-actions .text-link', content.heroFlow, true);
  setAll('.hero-proof strong', content.proof.map((item) => item[0]));
  setAll('.hero-proof span', content.proof.map((item) => item[1]));
  setAll('.marquee-track span', content.marquee);
  setText('.split-heading .eyebrow', content.capabilityEyebrow);
  setText('.split-heading h2', content.capabilityTitle, true);
  setText('.split-heading > p', content.capabilityIntro);
  setAll('.capability-card h3', content.capabilities.map((item) => item[0]));
  setAll('.capability-card > p', content.capabilities.map((item) => item[1]));
  setText('.workflow-heading .eyebrow', content.workflowEyebrow);
  setText('.workflow-heading h2', content.workflowTitle, true);
  setText('.workflow-heading > p', content.workflowIntro);
  setAll('.flow-step h3', content.flow.map((item) => item[0]));
  setAll('.flow-step p', content.flow.map((item) => item[1]));
  setText('.usecase-label .eyebrow', content.usecaseEyebrow);
  setText('.usecase-label p', content.usecaseIntro);
  setAll('.usecase-item h3', content.usecases.map((item) => item[0]));
  setAll('.usecase-item p', content.usecases.map((item) => item[1]));
  setText('.trust-copy .eyebrow', content.trustEyebrow);
  setText('.trust-copy h2', content.trustTitle, true);
  setText('.trust-copy > p', content.trustIntro);
  setText('.trust-copy .text-link', content.trustLink, true);
  setAll('.trust-evidence h3', content.trustItems.map((item) => item[0]));
  setAll('.trust-evidence p', content.trustItems.map((item) => item[1]));
  setText('.demo-copy .eyebrow', content.demoEyebrow);
  setText('.demo-copy h2', content.demoTitle, true);
  setText('.demo-copy > p', content.demoIntro);
  setText('.contact-note', `<span>✦</span> ${content.contactNote}`, true);
  setText('.form-heading span', content.formHeading);
  setAll('.demo-form label > span', content.formLabels);
  document.querySelectorAll('.demo-form input, .demo-form textarea').forEach((node, index) => node.setAttribute('placeholder', content.formPlaceholders[index]));
  setText('.button-warm', content.formButton, true);
  setText('.form-footnote', content.formFootnote);
  setText('.site-footer > p', content.footer);
  setText('.footer-meta a', content.backToTop);
  setAgentDemoLanguage(language);
  languageToggle.textContent = content.languageLabel;
  languageToggle.setAttribute('aria-label', content.languageAria);
  themeToggle.querySelector('.theme-label').textContent = document.documentElement.dataset.theme === 'dark' ? (isArabic ? 'فاتح' : 'Light') : content.themeLabel;
  themeToggle.setAttribute('aria-label', document.documentElement.dataset.theme === 'dark' ? (isArabic ? 'التبديل إلى الوضع الفاتح' : 'Switch to light mode') : content.themeAria);
  localStorage.setItem('sawtflow-language', language);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const language = localStorage.getItem('sawtflow-language') || 'en';
  const isArabic = language === 'ar';
  const isDark = theme === 'dark';
  themeToggle.querySelector('.theme-symbol').textContent = isDark ? '☼' : '◐';
  themeToggle.querySelector('.theme-label').textContent = isDark ? (isArabic ? 'فاتح' : 'Light') : (isArabic ? 'داكن' : 'Dark');
  themeToggle.setAttribute('aria-label', isDark ? (isArabic ? 'التبديل إلى الوضع الفاتح' : 'Switch to light mode') : (isArabic ? 'التبديل إلى الوضع الداكن' : 'Switch to dark mode'));
  localStorage.setItem('sawtflow-theme', theme);
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu.classList.toggle('open', !isOpen);
});

document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

languageToggle?.addEventListener('click', () => {
  const current = localStorage.getItem('sawtflow-language') || 'en';
  applyLanguage(current === 'en' ? 'ar' : 'en');
});

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.dataset.theme || 'light';
  applyTheme(current === 'light' ? 'dark' : 'light');
});

function resetAgentFlow() {
  demoEvidence.hidden = true;
  demoApproval.hidden = true;
  demoResponse.hidden = true;
  const state = document.querySelector('#transcript-state');
  if (state) state.textContent = (localStorage.getItem('sawtflow-language') || 'en') === 'ar' ? 'جاهز' : 'READY';
}

audioUpload?.addEventListener('change', () => {
  const file = audioUpload.files?.[0];
  if (!file) return;
  const language = localStorage.getItem('sawtflow-language') || 'en';
  resetAgentFlow();
  const state = document.querySelector('#transcript-state');
  if (state) state.textContent = language === 'ar' ? 'تم التحميل' : 'FILE READY';
  setText('#upload-label', file.name);
  transcriptInput.value = language === 'ar' ? 'أين طلبي؟ قيل لي إنه سيصل اليوم.' : 'Where is my order? I was told it would arrive today.';
});

sampleVoice?.addEventListener('click', () => {
  const language = localStorage.getItem('sawtflow-language') || 'en';
  transcriptInput.value = language === 'ar' ? 'أين طلبي؟ قيل لي إنه سيصل اليوم.' : 'Where is my order? I was told it would arrive today.';
  setText('#upload-label', language === 'ar' ? 'ارفع تسجيلاً عربياً' : 'Upload Arabic voice');
  resetAgentFlow();
});

editTranscript?.addEventListener('click', () => {
  const language = localStorage.getItem('sawtflow-language') || 'en';
  const editing = transcriptInput.readOnly;
  transcriptInput.readOnly = !editing;
  editTranscript.textContent = editing ? (language === 'ar' ? 'حفظ التصحيح' : 'Save correction') : (language === 'ar' ? 'صحّح النص' : 'Correct transcript');
  if (editing) transcriptInput.focus();
});

retrieveOrder?.addEventListener('click', () => {
  demoEvidence.hidden = false;
  demoApproval.hidden = false;
  demoResponse.hidden = true;
  demoApproval.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

approveReply?.addEventListener('click', () => {
  demoResponse.hidden = false;
  const language = localStorage.getItem('sawtflow-language') || 'en';
  if (draftResponse) draftResponse.textContent = language === 'ar' ? 'طلبك قيد الشحن، ومن المتوقع أن يصل اليوم قبل الساعة 6:00 مساءً.' : 'Your order is in transit and is expected to arrive today by 6:00 PM.';
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const language = localStorage.getItem('sawtflow-language') || 'en';
  const content = translations[language];
  const formData = new FormData(form);
  const name = formData.get('name');
  const leads = JSON.parse(localStorage.getItem('sawtflow-leads') || '[]');
  leads.push({ name, email: formData.get('email'), challenge: formData.get('challenge'), createdAt: new Date().toISOString() });
  localStorage.setItem('sawtflow-leads', JSON.stringify(leads));
  message.textContent = content.formThanks.replace('{, name}', name ? `, ${name}` : '');
  form.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
applyTheme(localStorage.getItem('sawtflow-theme') || 'light');
applyLanguage(localStorage.getItem('sawtflow-language') || 'en');
