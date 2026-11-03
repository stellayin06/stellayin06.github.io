'use strict';
const $=s=>document.querySelector(s);
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nameHtml=s=>escapeHtml(s).replace(/Stella Xin Yin\*?/g,m=>`<strong>${m}</strong>`);
let activeFilter='all';
function renderSelected(){
 const items=SELECTED.filter(p=>activeFilter==='all'||p.theme===activeFilter);
 $('#selected-papers').innerHTML=items.map(p=>`<article class="paper-card"><button class="paper-figure" data-figure="${p.id}" aria-label="Enlarge ${escapeHtml(p.figure)}: ${escapeHtml(p.alt)}"><img src="assets/figure-${p.id}.webp" alt="${escapeHtml(p.alt)}" loading="lazy"><span class="zoom" aria-hidden="true">⤢</span></button><div class="paper-body"><div class="venue">${escapeHtml(p.venue)}</div><h3><a href="${escapeHtml(p.pdf)}" target="_blank" rel="noopener">${escapeHtml(p.title)}</a></h3><p class="authors">${nameHtml(p.authors)}</p><p class="paper-summary">${escapeHtml(p.summary)}</p><div class="paper-bottom"><a href="${escapeHtml(p.pdf)}" target="_blank" rel="noopener">Paper ↗</a><span>${escapeHtml(p.figure)} · click to enlarge</span></div></div></article>`).join('');
 $('#selected-count').textContent=`${items.length} of ${SELECTED.length} selected papers`;
 document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter===activeFilter;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
}
function setTab(selected,focus=false){
 $('.figure-hint').hidden=!selected;
 for(const [name,on] of [['selected',selected],['all',!selected]]){const t=$(`#${name}-tab`);t.classList.toggle('active',on);t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;$(`#${name}-panel`).hidden=!on;if(on&&focus)t.focus();}
}
$('#selected-tab').addEventListener('click',()=>setTab(true));$('#all-tab').addEventListener('click',()=>setTab(false));
document.querySelectorAll('[role="tab"]').forEach(t=>t.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();setTab(e.key==='Home'?true:e.key==='End'?false:t.id!=='selected-tab',true);}}));
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;renderSelected();}));
document.querySelectorAll('[data-theme]').forEach(a=>a.addEventListener('click',()=>{activeFilter=a.dataset.theme;setTab(true);renderSelected();}));
function renderAll(){
 const q=$('#pub-search').value.trim().toLocaleLowerCase();const year=$('#pub-year').value;
 const items=PUBLICATIONS.filter(p=>(year==='all'||p.year===Number(year))&&p.citation.toLocaleLowerCase().includes(q));
 let current=null;let html='';
 for(const p of [...items].sort((a,b)=>b.year-a.year)){if(current!==p.year){current=p.year;html+=`<h3 class="year-heading">${p.year}</h3>`;}html+=`<article class="pub-row"><span class="pub-kind">${escapeHtml(p.kind)}</span><p class="pub-citation">${escapeHtml(p.citation)}</p>${p.url?`<a href="${escapeHtml(p.url)}" target="_blank" rel="noopener" aria-label="Open publication: ${escapeHtml(p.citation)}">↗</a>`:'<span></span>'}</article>`;}
 $('#publication-list').innerHTML=html||'<p class="no-results">No publications match. Try another keyword or year.</p>';
 $('#pub-count').textContent=`${items.length} of ${PUBLICATIONS.length} publications`;
}
$('#pub-search').addEventListener('input',renderAll);$('#pub-year').addEventListener('change',renderAll);
let figureTrigger=null;
$('#selected-papers').addEventListener('click',e=>{const b=e.target.closest('[data-figure]');if(!b)return;const p=SELECTED.find(p=>p.id===Number(b.dataset.figure));figureTrigger=b;$('#figure-title').textContent=p.title;$('#figure-image').src=`assets/figure-${p.id}.webp`;$('#figure-image').alt=p.alt;$('#figure-caption').textContent=`${p.figure}. ${p.alt}. Source: ${p.venue}.`;$('#figure-source').href=p.pdf;$('#figure-source').target='_blank';$('#figure-source').rel='noopener';$('#figure-dialog').showModal();document.body.style.overflow='hidden';});
function closeFigure(){$('#figure-dialog').close();}
$('#close-figure').addEventListener('click',closeFigure);$('#figure-dialog').addEventListener('click',e=>{if(e.target===$('#figure-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeFigure();}});$('#figure-dialog').addEventListener('close',()=>{document.body.style.overflow='';if(figureTrigger)figureTrigger.focus();});
$('.menu-toggle').addEventListener('click',()=>{const open=$('#nav').classList.toggle('open');$('.menu-toggle').setAttribute('aria-expanded',String(open));});
$('#nav').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{$('#nav').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');}));
renderSelected();renderAll();
