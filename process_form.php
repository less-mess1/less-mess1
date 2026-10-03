<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Basis form validatie
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['subject']) || empty($_POST['message'])) {
        header("Location: contact.html?status=error&message=Vul alle velden in");
        exit;
    }

    // Sanitize input
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    // Stel de e-mail samen
    $to = "100221@glr.nl";
    $email_subject = "Nieuw contactformulier bericht: $subject";
    
    $email_body = "Je hebt een nieuw bericht ontvangen via je portfolio website.\n\n".
                 "Naam: $name\n".
                 "Email: $email\n".
                 "Onderwerp: $subject\n\n".
                 "Bericht:\n$message";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    try {
        // Probeer de mail te versturen
        if(mail($to, $email_subject, $email_body, $headers)) {
            header("Location: contact.html?status=success");
        } else {
            throw new Exception("Mail verzenden mislukt");
        }
    } catch (Exception $e) {
        // Log de error (optioneel)
        error_log("Mail Error: " . $e->getMessage());
        header("Location: contact.html?status=error&message=Mail verzenden mislukt");
    }
    exit;
}
?> 