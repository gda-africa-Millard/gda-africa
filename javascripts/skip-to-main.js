/*----------------skip to main search---------- */
  if (!document.body.classList.contains('ip3-edit')) {
    document.querySelectorAll(".skip-to-main").forEach(element => {
        element.addEventListener('focus', () => {
            const parent = element.parentElement;
            parent.classList.add("visible");
            parent.classList.remove("invisible");
        });
        element.addEventListener('blur', () => {
            const parent = element.parentElement;
            parent.classList.remove("visible");
            parent.classList.add("invisible");
        });
    });
  }
/*--- error page redirection and counter starts --------*/
if (document.body.id === 'ip3-error-page' && !document.body.classList.contains('ip3-edit')) {
    let counterElement = document.querySelector('.counter');
    let counterValue = parseInt(counterElement.innerHTML, 10);
    let cnt = setInterval(function () {
        counterValue--;
        counterElement.innerHTML = counterValue < 10 ? '0' + counterValue : counterValue;
        if (counterValue <= 0) {
            window.location.href = window.location.protocol + '//' + window.location.hostname;
            clearInterval(cnt);
        }
    }, 1000);
}
    /*--- error page redirection and counter ends --------*/  
//     page to module starts here
document.addEventListener("DOMContentLoaded", function () {
  // Update hrefs with hashes
  document.querySelectorAll('[data-link-hash]').forEach(link => {
    const href = link.getAttribute('href');
    const hash = link.getAttribute('data-link-hash');
    if (href && hash) {
      const url = `${href}#${hash}`;
      link.setAttribute('href', url);
    }
  });
  // Handle hash scroll
  let hash = window.location.hash;
  if (hash && hash.includes("=")) {
    hash = hash.split("=")[0]; // Keep only part before =
  }
  if (hash) {
    const targetElement = document.getElementById(hash.substring(1));
    if (targetElement) {
      // Use requestAnimationFrame to wait until rendering is complete
      requestAnimationFrame(() => {
        targetElement.scrollIntoView({ behavior: "smooth" });
      });
    }
  }
});
document.querySelectorAll("table").forEach((e) => {
    let hs = e.parentElement.clientWidth < e.clientWidth; 
                let vs = e.parentElement.clientHeight < e.clientHeight;
                if(hs || vs) {console.log("yay"); e.setAttribute('tabindex','0')}
});