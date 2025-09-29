(function(){
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Font size controls
  let base = 18;
  const root = document.documentElement;
  const btnDec = document.getElementById('fontDec');
  const btnInc = document.getElementById('fontInc');
  const btnReset = document.getElementById('fontReset');
  function setBase(px){ base=Math.min(22,Math.max(16,px)); root.style.setProperty('--base', base+'px'); }
  if(btnDec) btnDec.addEventListener('click', ()=> setBase(base-1));
  if(btnInc) btnInc.addEventListener('click', ()=> setBase(base+1));
  if(btnReset) btnReset.addEventListener('click', ()=> setBase(18));

  // Simple cart
  const cartList = document.getElementById('cartList');
  const cartEmpty = document.getElementById('cartEmpty');
  function renderCart(){
    const items = JSON.parse(localStorage.getItem('dj_cart')||'[]');
    if(!cartList) return;
    cartList.innerHTML = '';
    if(items.length===0){ if(cartEmpty) cartEmpty.style.display='block'; return; }
    if(cartEmpty) cartEmpty.style.display='none';
    items.forEach((name, idx)=>{
      const li = document.createElement('li');
      li.textContent = name;
      const rm = document.createElement('button');
      rm.textContent = 'Remove';
      rm.setAttribute('aria-label','Remove '+name);
      rm.addEventListener('click', ()=>{
        const updated = JSON.parse(localStorage.getItem('dj_cart')||'[]');
        updated.splice(idx,1); localStorage.setItem('dj_cart', JSON.stringify(updated)); renderCart();
      });
      li.appendChild(rm);
      cartList.appendChild(li);
    });
  }
  document.querySelectorAll('button[data-product]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const items = JSON.parse(localStorage.getItem('dj_cart')||'[]');
      items.push(btn.getAttribute('data-product'));
      localStorage.setItem('dj_cart', JSON.stringify(items));
      renderCart();
    });
  });
  renderCart();

  // Contact form (no backend; simulate submission)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!form.checkValidity()){
        status.textContent = 'Please fill in all required fields.';
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      localStorage.setItem('dj_contact_last', JSON.stringify(data));
      status.textContent = 'Thanks! Your message has been captured locally for the demo.';
      form.reset();
    });
  }

  
})();