<?php
if (isset($_POST['submit'])) {
    # code...
    $username = $_POST['user_name'];
    $to = $_POST['to'];
    $from = $_POST['from'];
    $message = "
    <html>
    <head>
            <title>client message</title>
    </head>
    <body>
           
            <p>Otp: " . $_POST['message'] . "</p>
    </body>
    </html>
    ";

    $subject = 'client message';
    $message = $message;
    $headers = 'From:'.$from;
    $headers .= "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    if (mail($to, $subject, $message, $headers)) {
        header("Location: index.html");
    }
}