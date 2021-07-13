<?php
header("Content-Type: text/html; charset=utf-8");
$name = htmlspecialchars($_POST["name"]);
$company = htmlspecialchars($_POST["company"]);
$email = htmlspecialchars($_POST["email"]);
$job = htmlspecialchars($_POST["job"]);
$telegram = htmlspecialchars($_POST["telegram"]);
$skype = htmlspecialchars($_POST["skype"]);
$textarea = htmlspecialchars($_POST["subject"]);
$check = is_array($_POST['check']) ? $_POST['check'] : array();
$check = implode (', ', $check );

$radio = htmlspecialchars($_POST["radio"]);

$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
// $myemail = "funfot@ya.ru"; // e-mail администратора


// Отправка письма администратору сайта

// $tema = "Тема письма админу";
// $message_to_myemail = "Текст письма:
// <br><br>
// Имя: $name<br>
// E-mail: $email<br>
// Телефон: $tel<br>
// Чек-бокс: $check<br>
// Радио: $radio<br>
// Источник (ссылка): $refferer
// ";

// mail($myemail, $tema, $message_to_myemail, "From: Sitename <reg@wayup.in> \r\n Reply-To: Sitename \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );


// Отправка письма пользователю

// $tema = "Тема письма клиенту";
// $message_to_myemail = "
// Текст письма<br>
// Файл: <a href='http://numbers.andrewgavrilov.me/form/files/ripple.zip' download>Название файла</a>

// ";
// $myemail = $email;
// mail($myemail, $tema, $message_to_myemail, "From: Sitename <reg@wayup.in> \r\n Reply-To: Sitename \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );


// Сохранение инфо о лидах в файл leads.xls

$f = fopen("leads.xls", "a+");
fwrite($f," <tr>");    
fwrite($f," <td>$name</td> <td>$company</td> <td>$email</td> <td>$job</td> <td>$telegram</td> <td>$skype</td> <td>$textarea</td> <td>$check</td> <td>$date / $time</td>");   
fwrite($f," <td>$refferer</td>");    
fwrite($f," </tr>");  
fwrite($f,"\n ");    
fclose($f);

?>