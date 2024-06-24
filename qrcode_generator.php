<?php
// Include la libreria PHP QR Code
include "assets/phpqrcode/qrlib.php";

// Controlla se è stato inviato un URL tramite POST
if (isset($_POST['url'])) {
    // Sanitizza l'URL
    $url = filter_var($_POST['url'], FILTER_SANITIZE_URL);

    // Directory di salvataggio per i QR code (assicurati di avere i permessi di scrittura)
    $uploadDir = 'assets/qrcodes/';

    // Nome del file QR code
    $fileName = 'qrcode.png';

    // Percorso completo del file QR code
    $filePath = $uploadDir . $fileName;

    // Genera il QR code
    QRcode::png($url, $filePath);

    // Mostra il QR code generato
    echo '<!DOCTYPE html>';
    echo '<html lang="en">';
    echo '<head>';
    echo '<meta charset="UTF-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    echo '<title>QR Code Generated</title>';
    echo '<link rel="stylesheet" href="assets/css/styles.css">';
    echo '</head>';
    echo '<body>';
    echo '<div class="container">';
    echo '<h1>QR Code Generated</h1>';
    echo '<img src="' . $filePath . '" alt="QR Code">';
    echo '<p><a href="' . $filePath . '" download>Download QR Code</a></p>';
    echo '<p><a href="index.php">Generate Another QR Code</a></p>';
    echo '</div>';
    echo '</body>';
    echo '</html>';
    exit;
}
?>
