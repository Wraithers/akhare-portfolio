<?php

if(isset($_POST['email'])) {



    function died($error) {

        // your error code can go here

        echo "I'm terribly sorry to inform you there were error(s) in the form. ";

        echo "However, I'm here to help! Below are the errors ready for you to fix!.<br /><br />";

        echo $error."<br />";

        echo "Please resubmit after fixing the errors, I'd love to chat.";

        die();

    }



    // validation expected data exists

    if(!isset($_POST['name']) ||

        !isset($_POST['subject']) ||

        !isset($_POST['email']) ||

        !isset($_POST['message'])) {

        died('Hi, sorry to let you know that you have left out some fields.');

    }



    $name = $_POST['name']; // required

    $subject = $_POST['subject']; // required

    $email_from = $_POST['email']; // required

    $message = $_POST['message']; // required

    if(!empty($_POST["mobile"])) {
        $mobile = $_POST['mobile']; // not required
    }


    // EDIT THE 2 LINES BELOW AS REQUIRED

    $email_to = "ask@aaronkhare.com";

    $email_subject = $subject;




    $error_message = "";

    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  if(!preg_match($email_exp,$email_from)) {

    $error_message .= 'The email address you entered does not appear to be valid.<br />';

  }

    $string_exp = "/^[A-Za-z .'-]+$/";

  if(!preg_match($string_exp,$name)) {

    $error_message .= 'The name you entered does not appear to be valid.<br />';

  }

    $phone_exp = "/^[0-9 .'-]+$/";

    if(!empty($_POST["mobile"])) {

      if(strlen($mobile) < 10 || !preg_match($phone_exp,$mobile)) {

        $error_message .= 'The mobile number you entered does not appear to be valid.<br />';

      }

    }

  if(strlen($subject) == 0) {

    $error_message .= 'Please pick a subject for us to chat about.<br />';

  }

  if(strlen($message) < 2) {

    $error_message .= 'Your message seems terribly brief, please add a little more detail.<br />';

  }

  if(strlen($error_message) > 0) {

    died($error_message);

  }

    $email_message = "Form details below.\n\n";



    function clean_string($string) {

      $bad = array("content-type","bcc:","to:","cc:","href");

      return str_replace($bad,"",$string);

    }



    $email_message .= "Name: ".clean_string($name)."\n";

    $email_message .= "Email: ".clean_string($email_from)."\n";

    $email_message .= "Mobile: ".clean_string($mobile)."\n";

    $email_message .= "Comments: ".clean_string($message)."\n";





// create email headers

$headers = 'From: '.$email_from."\r\n".

'Reply-To: '.$email_from."\r\n" .

'X-Mailer: PHP/' . phpversion();

@mail($email_to, $email_subject, $email_message, $headers);



// include your own success html here

echo "Thanks for the mail! I'll check back with you soon, enjoy your day.";


}

?>
