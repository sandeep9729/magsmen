<?php
 require 'phpmailer/PHPMailerAutoload.php';
if (isset($_POST['submit'])) {


    
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

   

    $mail = new PHPMailer();
    
    // $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPSecure = "ssl";
    $mail->Port = 465;
    $mail->SMTPAuth = true;
    $mail->Username = 'surendrapinninti5@gmail.com';
    $mail->Password = 'amma@1997';
    
    $mail->setFrom($from, $username);
    $mail->addAddress($to);
    $mail->Subject = 'Mail from'.$username;
    $mail->Body = $message;
    
    if ($mail->send())
    header("Location: index.html");
    else {
        echo $mail->ErrorInfoy;
    }    
    }
