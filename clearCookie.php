<?php
ob_start();

// Cookie name
$cookie_name = "authToken";

// Clear it by setting expiration in the past
setcookie($cookie_name, "", time() - 3600, "/", "localhost", false, true);

// Unset from $_COOKIE for current request
unset($_COOKIE[$cookie_name]);

echo "Cookie '$cookie_name' cleared on localhost:5000";

ob_end_flush();
?>
