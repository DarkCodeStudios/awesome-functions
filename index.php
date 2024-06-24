<?php
// Funzione per iniziare il documento PHP
function start_document() {
    echo '<?php header("Content-Type: text/html"); ?>';
    start_head();
    start_body();
}

// Funzione per iniziare la sezione head
function start_head() {
    echo '<?php echo "<head>"; ?>';
    echo '<?php echo "<meta charset=\"UTF-8\">"; ?>';
    echo '<?php echo "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"; ?>';
    echo '<?php echo "<title>QR Code Generator</title>"; ?>';
    echo '<?php echo "<link rel=\"stylesheet\" href=\"assets/css/styles.css\">"; ?>';
    echo '<?php echo "</head>"; ?>';
}

// Funzione per iniziare la sezione body
function start_body() {
    echo '<?php echo "<body>"; ?>';
    start_container();
    echo '<?php echo "<script src=\"assets/js/script.js\"></script>"; ?>';
    end_body();
}

// Funzione per il contenitore principale
function start_container() {
    echo '<?php echo "<div class=\"container\">"; ?>';
    echo '<?php echo "<h1>QR Code Generator</h1>"; ?>';
    echo '<?php echo "<form action=\"qrcode_generator.php\" method=\"post\">"; ?>';
    echo '<?php echo "<label for=\"url\">Enter URL:</label>"; ?>';
    echo '<?php echo "<input type=\"text\" id=\"url\" name=\"url\" required>"; ?>';
    echo '<?php echo "<button type=\"submit\">Generate QR Code</button>"; ?>';
    echo '<?php echo "</form>"; ?>';
    echo '<?php echo "</div>"; ?>';
}

// Funzione per terminare la sezione body e html
function end_body() {
    echo '<?php echo "</body>"; ?>';
    echo '<?php echo "</html>"; ?>';
}

// Avvia la generazione del documento
start_document();
?>
