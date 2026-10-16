const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const form = document.querySelector('#demo-form');
const message = document.querySelector('#form-message');

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

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const name = new FormData(form).get('name');
  message.textContent = `Thanks${name ? `, ${name}` : ''}. This preview validates the inquiry flow; connect it to your CRM or inbox to receive live requests.`;
  form.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
