const langToggle = document.querySelector('[data-lang-toggle]');
const themeToggle = document.querySelector('[data-theme-toggle]');
const audioInput = document.querySelector('#studio-audio');
const dropzone = document.querySelector('#dropzone');
const fileName = document.querySelector('#file-name');
const audioStatus = document.querySelector('#audio-status');
const recordButton = document.querySelector('#studio-record');
const recordLabel = document.querySelector('#record-label');
const recordTimer = document.querySelector('#record-timer');
const recordedAudio = document.querySelector('#recorded-audio');
const uploadedAudio = document.querySelector('#uploaded-audio');
const sampleButton = document.querySelector('#studio-sample');
const transcript = document.querySelector('#studio-transcript');
const editButton = document.querySelector('#studio-edit');
const generateButton = document.querySelector('#studio-generate');
const analyzeButton = document.querySelector('#studio-analyze');
const retrieveButton = document.querySelector('#studio-retrieve');
const approveButton = document.querySelector('#studio-approve');
const evidence = document.querySelector('#studio-evidence');
const orderIdInput = document.querySelector('#studio-order-id');
const lookupStatus = document.querySelector('#lookup-status');
const evidenceOrder = document.querySelector('#evidence-order');
const evidenceStatus = document.querySelector('#evidence-status');
const evidenceEta = document.querySelector('#evidence-eta');
const evidenceScan = document.querySelector('#evidence-scan');
const approved = document.querySelector('#studio-approved');
const confidence = document.querySelector('#studio-confidence');
const response = document.querySelector('#studio-response');
let activeOrder = null;
let mediaRecorder;
let recorderStream;
let recordedChunks = [];
let recordSeconds = 0;
let recordInterval;

const sample = {
  en: { transcript: 'Where is my order? I was told it would arrive today.', quote: 'Where is my order? I was told it would arrive today.', response: 'Your order is in transit and is expected to arrive today by 6:00 PM.' },
  ar: { transcript: 'أين طلبي؟ قيل لي إنه سيصل اليوم.', quote: 'أين طلبي؟ قيل لي إنه سيصل اليوم.', response: 'طلبك قيد الشحن، ومن المتوقع أن يصل اليوم قبل الساعة 6:00 مساءً.' }
};

const copy = {
  en: { back: 'Back to homepage', eyebrow: 'SAWTFLOW STUDIO / VOICE INTELLIGENCE WORKSPACE', title: 'Turn voice into the<br /><em>next right action.</em>', lead: 'Upload a conversation, correct what speech recognition heard, and watch SawtFlow turn customer intent into a verified business response.', note: 'Sample workspace · Arabic order-status flow', stepInput: 'Input', stepInputSub: 'Upload or record voice', stepUnderstand: 'Understand', stepUnderstandSub: 'Transcript + intent', stepAct: 'Act', stepActSub: 'Retrieve evidence', stepApprove: 'Approve', stepApproveSub: 'Human in control', ready: 'READY', sourceTitle: 'Start with a real voice.', sourceLead: 'Use an Arabic recording, record directly, or load the sample message to explore the flow.', upload: 'Upload Arabic audio', fileHint: 'MP3, WAV, M4A · up to 25 MB', record: 'Record voice', sample: 'Use sample message', audioReady: 'No audio selected', speechReady: 'SPEECH RECOGNITION READY', transcriptTitle: 'Correct the meaning,<br /><em>not the speaker.</em>', transcriptLead: 'SawtFlow preserves recognition meaning while you refine errors.', transcriptLabel: 'TRANSCRIPT', edit: 'Edit transcript', generate: 'Generate transcript', confidence: 'Confidence 96.8%', analyze: 'Analyze intent →', intentTitle: 'What the customer<br /><em>needs.</em>', detected: 'DETECTED INTENT', orderStatus: 'Order status', approvedLookup: 'APPROVED LOOKUP', actionTitle: 'Retrieve the<br /><em>right evidence.</em>', actionLead: 'The agent proposes a read-only order lookup before drafting a response.', orderIdLabel: 'ORDER ID', lookupReady: 'Mock database ready · 6 sample orders', retrieve: 'Retrieve order status →', humanGate: 'HUMAN GATE', responseTitle: 'Respond with<br /><em>context.</em>', draftLabel: 'DRAFT RESPONSE', approve: 'Approve response ✓', approved: 'Approved · ready to send', disclaimer: 'Studio preview uses six local mock orders, including delayed and canceled cases. Replace them with your CRM or order API for production.' },
  ar: { back: 'العودة إلى الصفحة الرئيسية', eyebrow: 'استوديو SawtFlow / مساحة الذكاء الصوتي', title: 'حوّل الصوت إلى<br /><em>الإجراء الصحيح التالي.</em>', lead: 'ارفع محادثة، وصحّح ما التقطه التعرّف الصوتي، وشاهد كيف يحوّل SawtFlow نية العميل إلى رد موثوق.', note: 'مساحة تجريبية · تدفق حالة طلب عربي', stepInput: 'إدخال', stepInputSub: 'رفع أو تسجيل الصوت', stepUnderstand: 'فهم', stepUnderstandSub: 'النص والنية', stepAct: 'إجراء', stepActSub: 'استرجاع الأدلة', stepApprove: 'اعتماد', stepApproveSub: 'الإنسان في التحكم', ready: 'جاهز', sourceTitle: 'ابدأ بصوت حقيقي.', sourceLead: 'استخدم تسجيلاً عربياً أو سجّل مباشرة أو حمّل الرسالة التجريبية لاستكشاف التدفق.', upload: 'ارفع صوتاً عربياً', fileHint: 'MP3 وWAV وM4A · حتى 25 ميغابايت', record: 'تسجيل صوت', sample: 'استخدم رسالة تجريبية', audioReady: 'لم يتم اختيار صوت', speechReady: 'التعرّف الصوتي جاهز', transcriptTitle: 'صحّح المعنى،<br /><em>لا المتحدث.</em>', transcriptLead: 'يحافظ SawtFlow على المعنى بينما تنقّح أخطاء التعرّف.', transcriptLabel: 'النص المفرغ', edit: 'تعديل النص', generate: 'توليد النص', confidence: 'الثقة 96.8%', analyze: 'حلّل النية ←', intentTitle: 'ما الذي<br /><em>يحتاجه العميل.</em>', detected: 'النية المكتشفة', orderStatus: 'حالة الطلب', approvedLookup: 'بحث معتمد', actionTitle: 'استرجع<br /><em>الدليل الصحيح.</em>', actionLead: 'يقترح الوكيل بحثاً للقراءة فقط قبل صياغة الرد.', orderIdLabel: 'رقم الطلب', lookupReady: 'قاعدة تجريبية جاهزة · 6 طلبات', retrieve: 'استرجاع حالة الطلب ←', humanGate: 'بوابة بشرية', responseTitle: 'استجب<br /><em>بسياق.</em>', draftLabel: 'رد مقترح', approve: 'اعتماد الرد ✓', approved: 'تم الاعتماد · جاهز للإرسال', disclaimer: 'يستخدم عرض الاستوديو ستة طلبات محلية تجريبية، تشمل حالات التأخير والإلغاء. استبدلها بنظام CRM أو واجهة الطلبات في الإنتاج.' }
};

function currentLanguage() { return localStorage.getItem('sawtflow-language') || 'en'; }
function setAllI18n(language) {
  const strings = copy[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (strings[key] !== undefined) node.innerHTML = strings[key];
  });
  langToggle.textContent = language === 'ar' ? 'EN' : 'عربي';
  langToggle.setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'Switch to Arabic');
  transcript.value = sample[language].transcript;
  document.querySelector('#sample-quote-text').textContent = sample[language].quote;
  if (!approved.hidden) response.textContent = sample[language].response;
  localStorage.setItem('sawtflow-language', language);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const language = currentLanguage();
  const dark = theme === 'dark';
  themeToggle.querySelector('.theme-symbol').textContent = dark ? '☼' : '◐';
  themeToggle.querySelector('.theme-label').textContent = dark ? (language === 'ar' ? 'فاتح' : 'Light') : (language === 'ar' ? 'داكن' : 'Dark');
  themeToggle.setAttribute('aria-label', dark ? (language === 'ar' ? 'التبديل إلى الوضع الفاتح' : 'Switch to light mode') : (language === 'ar' ? 'التبديل إلى الوضع الداكن' : 'Switch to dark mode'));
  localStorage.setItem('sawtflow-theme', theme);
}

function resetOutputs() { evidence.hidden = true; approved.hidden = true; activeOrder = null; approveButton.disabled = true; }
function clearUploadedAudio() { if (uploadedAudio) { uploadedAudio.pause(); uploadedAudio.removeAttribute('src'); uploadedAudio.load(); uploadedAudio.hidden = true; } }
function loadSample() { const language = currentLanguage(); clearUploadedAudio(); transcript.value = sample[language].transcript; fileName.textContent = language === 'ar' ? 'رسالة عينة جاهزة' : 'Sample message ready'; audioStatus.textContent = language === 'ar' ? 'تم تحميل العينة' : 'Sample loaded'; resetOutputs(); }
function loadAudioFile(file) { if (!file) return; const language = currentLanguage(); if (uploadedAudio) { uploadedAudio.src = URL.createObjectURL(file); uploadedAudio.hidden = false; } fileName.textContent = file.name; audioStatus.textContent = language === 'ar' ? 'تم تحميل الصوت' : 'Audio loaded'; transcript.value = sample[language].transcript; resetOutputs(); }

function formatRecordTime() { return `${String(Math.floor(recordSeconds / 60)).padStart(2, '0')}:${String(recordSeconds % 60).padStart(2, '0')}`; }
function setRecordLabel(text) { if (recordLabel) recordLabel.textContent = text; }
function stopRecorderStream() { recorderStream?.getTracks().forEach((track) => track.stop()); recorderStream = null; }

async function toggleRecording() {
  const language = currentLanguage();
  if (mediaRecorder?.state === 'recording') { mediaRecorder.stop(); return; }
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    audioStatus.textContent = language === 'ar' ? 'التسجيل غير مدعوم في هذا المتصفح' : 'Recording is not supported in this browser';
    return;
  }
  try {
    recorderStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(recorderStream);
    mediaRecorder.addEventListener('dataavailable', (event) => { if (event.data.size) recordedChunks.push(event.data); });
    mediaRecorder.addEventListener('stop', () => {
      clearInterval(recordInterval);
      const blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
      if (recordedAudio) { recordedAudio.src = URL.createObjectURL(blob); recordedAudio.hidden = false; }
      clearUploadedAudio();
      fileName.textContent = language === 'ar' ? 'تسجيل صوتي جاهز' : 'Recorded voice ready';
      audioStatus.textContent = language === 'ar' ? `تم التسجيل · ${formatRecordTime()}` : `Recorded · ${formatRecordTime()}`;
      setRecordLabel(copy[language].record);
      recordButton.classList.remove('recording');
      stopRecorderStream();
      transcript.value = sample[language].transcript;
      resetOutputs();
    });
    recordSeconds = 0;
    audioStatus.textContent = language === 'ar' ? 'جارٍ التسجيل · 00:00' : 'Recording · 00:00';
    recordButton.classList.add('recording');
    setRecordLabel(language === 'ar' ? 'إيقاف التسجيل' : 'Stop recording');
    mediaRecorder.start();
    recordInterval = setInterval(() => { recordSeconds += 1; audioStatus.textContent = language === 'ar' ? `جارٍ التسجيل · ${formatRecordTime()}` : `Recording · ${formatRecordTime()}`; }, 1000);
  } catch {
    stopRecorderStream();
    audioStatus.textContent = language === 'ar' ? 'اسمح بالوصول إلى الميكروفون للبدء' : 'Allow microphone access to start recording';
  }
}

recordButton.addEventListener('click', toggleRecording);
sampleButton.addEventListener('click', loadSample);
audioInput.addEventListener('change', () => loadAudioFile(audioInput.files?.[0]));
['dragenter', 'dragover'].forEach((eventName) => dropzone.addEventListener(eventName, (event) => { event.preventDefault(); dropzone.classList.add('dragover'); }));
['dragleave', 'drop'].forEach((eventName) => dropzone.addEventListener(eventName, (event) => { event.preventDefault(); dropzone.classList.remove('dragover'); }));
dropzone.addEventListener('drop', (event) => loadAudioFile(event.dataTransfer.files?.[0]));
editButton.addEventListener('click', () => { const editing = transcript.readOnly; transcript.readOnly = !editing; editButton.textContent = editing ? (currentLanguage() === 'ar' ? 'حفظ التصحيح' : 'Save correction') : copy[currentLanguage()].edit; if (editing) transcript.focus(); });
generateButton.addEventListener('click', () => { transcript.value = sample[currentLanguage()].transcript; confidence.textContent = copy[currentLanguage()].confidence; audioStatus.textContent = currentLanguage() === 'ar' ? 'تم توليد النص' : 'Transcript generated'; resetOutputs(); });
analyzeButton.addEventListener('click', () => { confidence.textContent = currentLanguage() === 'ar' ? 'الثقة 98.4%' : 'Confidence 98.4%'; document.querySelector('.intent-card').classList.add('is-analyzed'); });
retrieveButton.addEventListener('click', async () => { const language = currentLanguage(); const requestedId = orderIdInput.value.trim().toUpperCase(); lookupStatus.textContent = language === 'ar' ? 'جارٍ البحث…' : 'Looking up…'; retrieveButton.disabled = true; approveButton.disabled = true; try { const result = await fetch('mock-orders.json'); const database = await result.json(); activeOrder = database.orders.find((order) => order.id === requestedId); if (!activeOrder) throw new Error('not-found'); evidence.hidden = false; evidenceOrder.textContent = activeOrder.id; evidenceStatus.textContent = activeOrder.status; evidenceEta.textContent = activeOrder.eta; evidenceScan.textContent = activeOrder.lastScan; response.textContent = activeOrder.response; lookupStatus.textContent = language === 'ar' ? 'تم العثور على الطلب' : 'Order found'; approveButton.disabled = false; document.querySelector('.evidence-card').classList.add('is-retrieved'); } catch { activeOrder = null; evidence.hidden = true; approved.hidden = true; response.textContent = language === 'ar' ? 'لا يوجد رد حتى يتم العثور على طلب صالح.' : 'No response drafted until a valid order is found.'; lookupStatus.textContent = language === 'ar' ? 'لم يتم العثور على الطلب' : 'Order not found'; } finally { retrieveButton.disabled = false; } });
approveButton.addEventListener('click', () => { if (!activeOrder) return; approved.hidden = false; response.textContent = activeOrder.response; document.querySelector('.approval-card').classList.add('is-approved'); });
langToggle.addEventListener('click', () => setAllI18n(currentLanguage() === 'en' ? 'ar' : 'en'));
themeToggle.addEventListener('click', () => setTheme((document.documentElement.dataset.theme || 'light') === 'light' ? 'dark' : 'light'));

setTheme(localStorage.getItem('sawtflow-theme') || 'light');
setAllI18n(currentLanguage());
