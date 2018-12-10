<?php header('Content-type: text/html; charset=utf-8');?>
<style>
	.thanks{
    font-size: 3rem;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%,-50%);
    color: #545454;
    background: #d6d6d6;
    display: block;
    width: 100%;
    text-align: center;
    padding: 20px 0;
    box-shadow: 0 0 15px 2px #2b522661;
}

</style>
<?php 

setlocale(LC_ALL, "russian");
$monthes = array(
    1 => 'Января', 2 => 'Февраля', 3 => 'Марта', 4 => 'Апреля',
    5 => 'Мая', 6 => 'Июня', 7 => 'Июля', 8 => 'Августа',
    9 => 'Сентября', 10 => 'Октября', 11 => 'Ноября', 12 => 'Декабря'
);

$data = (date('d ') . $monthes[(date('n'))] . date(' Y, H:i:s'));


if($_POST['name']){
    $name = trim(strip_tags($_POST['name']));
}else{
    $name = "";
}
if($_POST['tel']){
    $phone = trim(strip_tags($_POST['tel']));
}else{
    $phone = "";
}

if($_POST['email']){
    $email = trim(strip_tags($_POST['email']));
}else{
    $mail = "";
}

if($_POST['text']){
    $text = trim(strip_tags($_POST['text']));
}else{
    $text = "";
}



$body = " <br>Дата: $data Имя: $name <br> Телефон: $phone <br> Почта: $email  <br>Сообщение: $text" ;
require_once($_SERVER['DOCUMENT_ROOT'] . '/phpmailer/PHPMailerAutoload.php'); //подключаем класс
$mail = new PHPMailer(); //вызываем класс
$mail->CharSet = 'utf-8';   //Устанавливаем кодировку
$mail->SetLanguage('ru');   //для ошибок итд.
$mail->addAddress("phpner@gmail.com","phpner"); //куда отправлять список через ","
$mail->From = 'http://ermilovgroup.ru';
$mail->addReplyTo("phpner@gmail.com","Ермилов и партнеры");
$mail->FromName = 'Ермилов и партнеры';
$mail->Subject = "Ермилов и партнеры";
$mail->Body = $body;
$mail->IsHTML(true);
//отправка 
if(!$mail->Send()) {
    echo "Mailer Error: " . $mail->ErrorInfo; //Выводит ошибку с учетом языка
} else {
    echo "<b class='thanks'>Мы Вам скоро перезвоним!</b>";
}
/*header( 'Refresh: 0; url=http://kuban-hostel.ru/' );*/
/*exit;*/
?>

<script>

	setInterval(function(){
		document.location.href = '/'
	},3000);
</script>