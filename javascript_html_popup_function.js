/* Un modo semplice per fare  un bottone in javascript che apre un alert sul tuo sito web */

/**
 *  Aggiungi al tuo codice html:
 *  <button id="popup testo">Start Popup</button>
 * 
 *  Alla fine della tua pagina html aggiungi:
 *  <script src="simple_popup_in_javascript.js"></script>
 */

document.getElementById('popup').onclick = function (){
    alert('Contenuto del tuo popup');
    document.getElementById('testo').textContent = "Bottone Premuto!";
};
