<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
class Mail
{
    //Create an instance; passing `true` enables exceptions
    static public function sendMail($destino, $body, $subject,$file="")
    {
        $mail = new PHPMailer(true);

        try {
            //Send using SMTP
            $mail->isSMTP();
            //Set the SMTP server to send through
            $mail->Host = 'smtp.gmail.com';
            //Enable SMTP authentication
            $mail->SMTPAuth = true;
            //SMTP username
            $mail->Username = '**********';
            //SMTP password
            $mail->Password = '*******';
            //Enable implicit TLS encryption
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            $mail->Port = 465;

            //Recipients
            $mail->setFrom('********');
            //Add a recipient
            $mail->addAddress($destino, 'Alias');

            //Content
            $mail->isHTML(false);
            //Set email format to HTML
            $mail->Subject = $subject;
            //insertamos el body al mail
            $mail->Body = $body;
            if ($file!="") {
                $mail->addAttachment($file);
            }
            $mail->CharSet = 'UTF-8';
            $mail->send();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
