'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

// Mobile navigation, working on both click and keyboard.
const menuToggle = $('#menu-toggle');
const mobileNav = $('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
}
menuToggle.addEventListener('click', () => {
  mobileNav.hidden = !mobileNav.hidden;
  menuToggle.setAttribute('aria-expanded', String(!mobileNav.hidden));
});
$$('.mobile-nav a').forEach(anchor => anchor.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 810) closeMenu(); });

// Header gets a slightly richer backing after the hero.
const header = $('.site-header');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 80);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Progressive enhancements; content remains visible without motion preferences.
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
  $$('.reveal').forEach(el => revealObserver.observe(el));
} else {
  $$('.reveal').forEach(el => el.classList.add('is-visible'));
}

const stories = [
  ['THE CALL', 'An unexpected voice emerges from the campaign headquarters. A completely fictional candidate decides to run an election powered by memes.'],
  ['THE ANNOUNCEMENT', 'The candidate takes the podium. Cameras flash, flags wave, and a satirical campaign takes its first steps.'],
  ['THE CAMPAIGN TRAIL', 'From city streets to desert highways, the campaign goes on tour in a star-spangled bus.'],
  ['THE DEBATE', 'The fictional candidate walks onto a neon-lit stage and steals the spotlight.'],
  ['THE MEDIA STORM', 'The campaign becomes a tabloid sensation. Every new headline turns into another meme.'],
  ['THE OPPOSITION', 'The political establishment is shocked. The parody competition has never seen anything like this.'],
  ['THE BALLOT', 'On the Ethereum meme ballot, it is time for the characters to cast their pretend votes. This is not a real ballot.'],
  ['ELECTION NIGHT', 'A fictional results room lights up in violet. Everything on the parody dashboard is for entertainment only.'],
  ['THE VICTORY', 'Fireworks, confetti, cheering supporters: a cinematic ending for the imaginary campaign.']
];
const galleryAlt = [
  'PATRIOTIC PORTRAIT', 'ON THE ROAD', 'CAPITOL SUNSET', 'CAMPAIGN STYLE',
  'THE AVIATOR', 'STAR-SPANGLED GLAM', 'FLAG DAY', 'CANDIDATE PORTRAIT'
];
const galleryDescriptions = [
  'A proud campaign photograph with a glamorous, original fictional character.',
  'The candidate heads to her next campaign stop.',
  'An evocative view of the United States Capitol.',
  'The campaign mixes fashion and absurd political satire.',
  'A campaign-trail portrait in a military-inspired jacket.',
  'Retro campaign glamour meets Ethereum-violet lighting.',
  'The American flag adds a dramatic background to the photoshoot.',
  'A bold visual from the fictional election adventure.'
];

const mediaDialog = $('#media-dialog');
const dialogImage = $('#dialog-image');
const dialogHeading = $('#dialog-heading');
const dialogDescription = $('#dialog-description');
const dialogCounter = $('#dialog-counter');
let activeCollection = 'story';
let activeIndex = 0;
let lastFocused = null;
function mediaFile(collection, index) {
  return `assets/${collection === 'story' ? 'story' : 'gallery'}-${String(index + 1).padStart(2, '0')}.webp`;
}
function collectionCount() { return activeCollection === 'story' ? stories.length : galleryAlt.length; }
function paintMedia() {
  const total = collectionCount();
  activeIndex = (activeIndex + total) % total;
  dialogImage.src = mediaFile(activeCollection, activeIndex);
  if (activeCollection === 'story') {
    dialogImage.alt = stories[activeIndex][0];
    dialogHeading.textContent = stories[activeIndex][0];
    dialogDescription.textContent = stories[activeIndex][1];
  } else {
    dialogImage.alt = galleryAlt[activeIndex];
    dialogHeading.textContent = galleryAlt[activeIndex];
    dialogDescription.textContent = galleryDescriptions[activeIndex];
  }
  dialogCounter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}
function openMedia(collection, index) {
  lastFocused = document.activeElement;
  activeCollection = collection;
  activeIndex = index;
  paintMedia();
  if (!mediaDialog.open) mediaDialog.showModal();
}
$$('[data-story]').forEach(button => button.addEventListener('click', () => openMedia('story', Number(button.dataset.story))));
$$('[data-gallery]').forEach(button => button.addEventListener('click', () => openMedia('gallery', Number(button.dataset.gallery))));
$('#view-gallery').addEventListener('click', () => openMedia('gallery', 0));
$('.media-dialog .dialog-close').addEventListener('click', () => mediaDialog.close());
$('.dialog-prev').addEventListener('click', () => { activeIndex--; paintMedia(); });
$('.dialog-next').addEventListener('click', () => { activeIndex++; paintMedia(); });
mediaDialog.addEventListener('click', e => { if (e.target === mediaDialog) mediaDialog.close(); });
mediaDialog.addEventListener('close', () => lastFocused?.focus());
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !mobileNav.hidden) closeMenu();
  if (!mediaDialog.open) return;
  if (e.key === 'ArrowRight') { activeIndex++; paintMedia(); }
  if (e.key === 'ArrowLeft') { activeIndex--; paintMedia(); }
});

// Four actual content views, all clearly labelled as a parody / mock interface.
const hqContent = {
  polling: ['FICTIONAL POLLING', 'The hype is off the charts. This is a parody campaign dashboard, not real election polling or results.'],
  media: ['CAMPAIGN MEDIA', 'Explore the nine-chapter story or open the campaign gallery to see fictional campaign photos.'],
  memes: ['MEME GENERATOR ROOM', 'The meme gallery is your propaganda-free, fictional campaign archive. Choose a gallery picture to open the viewer.'],
  events: ['CAMPAIGN TIMELINE', 'Announcement → Tour → Debate → Election Night → Finale. All events are part of the fictional Elect The Hottie storyline.']
};
const hqInfo = $('#hq-info');
$$('[data-hq]').forEach(tab => tab.addEventListener('click', () => {
  $$('[data-hq]').forEach(button => {
    const active = button === tab;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });
  const [heading, description] = hqContent[tab.dataset.hq];
  hqInfo.innerHTML = '';
  const h = document.createElement('strong'); h.textContent = heading;
  const p = document.createElement('p'); p.textContent = description;
  hqInfo.append(h, p);
}));

// Never invent social URLs. If links are later available, replace these handlers with real hrefs.
const noticeDialog = $('#notice-dialog');
$$('.social-link').forEach(button => button.addEventListener('click', () => {
  const network = button.dataset.network || (button.textContent.trim().includes('✈') ? 'Telegram' : 'X');
  $('#notice-title').textContent = `${network.toUpperCase()} — COMING SOON`;
  $('#notice-message').textContent = `The official ${network} account URL has not been provided yet. Add it in script.js when the project launches.`;
  noticeDialog.showModal();
}));
$('.notice-dialog .dialog-close').addEventListener('click', () => noticeDialog.close());
$('#notice-ok').addEventListener('click', () => noticeDialog.close());
noticeDialog.addEventListener('click', e => { if (e.target === noticeDialog) noticeDialog.close(); });

let toastTimeout;
function toast(message) {
  const box = $('#toast');
  box.textContent = message;
  box.classList.add('is-visible');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => box.classList.remove('is-visible'), 2800);
}
$('#copy-ca').addEventListener('click', async () => {
  // The CA is not yet known. Copy the literal visible placeholder and disclose what happened.
  const placeholder = $('#contract-text').textContent;
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(placeholder);
    else {
      const input = document.createElement('textarea'); input.value = placeholder;
      document.body.append(input); input.select(); document.execCommand('copy'); input.remove();
    }
    toast('Copied placeholder: contract address not yet announced.');
  } catch {
    toast('Contract address is not yet announced.');
  }
});
