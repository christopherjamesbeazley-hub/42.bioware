const root=document.documentElement;
window.addEventListener('pointermove',e=>{root.style.setProperty('--mx',`${e.clientX}px`);root.style.setProperty('--my',`${e.clientY}px`)},{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
const menu=document.querySelector('.menu');menu.addEventListener('click',()=>{const open=document.querySelector('.topbar').classList.toggle('open');menu.setAttribute('aria-expanded',open)});document.querySelectorAll('.topbar nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.topbar').classList.remove('open')));
const inquiry = document.querySelector('#inquiry');
const status = document.querySelector('#form-status');
const message = inquiry.elements.namedItem('message');
const generator = document.querySelector('#generate-message');
let previousDraft = '';
generator.addEventListener('click', () => {
  if (message.value.trim() && message.value !== previousDraft && !window.confirm('Replace your current message with a new draft?')) return;
  const name = inquiry.elements.namedItem('name').value.trim();
  const organisation = inquiry.elements.namedItem('organisation').value.trim();
  const interest = inquiry.elements.namedItem('interest').value.toLowerCase();
  const context = document.querySelector('#message-context').value.trim();
  previousDraft = [
    'Hello 42 Bioware team,',
    `I${name ? ' am ' + name : ' would like to get in touch'}${organisation ? ' from ' + organisation : ''}. I am interested in ${interest} and would welcome a conversation about Project Janus.`,
    context ? `I would like to explore: ${context}` : 'I would like to learn more about your research direction and explore where our interests might align.',
    'Could we discuss possible next steps?',
    `Kind regards${name ? ',\n' + name : ''}`
  ].join('\n\n');
  message.value = previousDraft;
  status.textContent = 'Draft ready. Review and edit your message before sending.';
  message.focus();
});
inquiry.addEventListener('submit', event => {
  // Netlify removes data-netlify during deployment. Unprocessed previews cannot collect inquiries.
  if (inquiry.hasAttribute('data-netlify') || location.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) {
    event.preventDefault();
    status.textContent = 'This preview cannot send inquiries. Your message has not been sent. Submission becomes available on the deployed Netlify site.';
    return;
  }
  // Use native POST so only Netlify's successful response navigates to the thank-you page.
  status.textContent = 'Sending your inquiry…';
});
