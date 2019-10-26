<?php
  // Redirect.
  function redirect($success)
  {
    $success = $success ? "1" : "0";
    header("Location: index.html?success=" . $success);
    exit;
  }

  // Read fields.
  $first = $_POST["first"];
  $last = $_POST["last"];
  $phone = $_POST["phone"];
  $email = $_POST["email"];
  $message = $_POST["message"];

  // Validate first name.
  if (empty($first) or strlen($first) > 100)
  {
    redirect(false);
    return;
  }

  // Validate last name.
  if (!(empty($last)) and strlen($last) > 100)
  {
    redirect(false);
    return;
  }

  // Default last name if necessary.
  if (empty($last))
  {
    $last = "";
  }

  // Validate phone number.
  $phoneExists = !empty($phone);
  if($phoneExists and strlen($phone) > 20) {
    redirect(false);
    return;
  }

  // Validate email address.
  $emailExists = !empty($email);
  if ($emailExists and (!filter_var($email, FILTER_VALIDATE_EMAIL))) {
    redirect(false);
    return;
  }

  // Validate message.
  if (!empty($message) and strlen($message) > 250)
  {
    redirect(false);
    return;
  }

  // Phone or email must be provided.
  if (!$phoneExists and !$emailExists)
  {
    redirect(false);
    return;
  }

  // Form the message.
  $emailMessage = "A contact message was submitted through the site. \r\n First: " . $first . "\r\n Last: " . $last . "\r\n Phone: " . $phone . "\r\n Email: " . $email . "\r\n Message: " . $message;

  // Statics.
  $headers = "From: site@structdevelopment.com";

  // Send mail.
  $success = @mail("wroton@structdevelopment.com", "Contact Message", $emailMessage, $headers);
  $success = $success ? "true" : "false";

  // Redirect to the site with an indication about success.
  redirect(true);
  exit;
?>