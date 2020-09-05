key = CryptoJS.SHA256($("#password").val()).toString().substring(1, 17)
iv = CryptoJS.SHA256($("#password").val()).toString().substring(21, 37)
data = $("#message").val() //原始聊天内容
function getaes() { //加密
    var encrypted = CryptoJS.AES.encrypt(data, key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();
}

//a = getaes() //得到加密后的字符串

function getdaes(a) {//解密
    var decrypted = CryptoJS.AES.decrypt(a, key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

//b = getdaes(a) //得到解密后的字符串

$(function () {
    const socket = io.connect();
    const $sendbutton = $('#sendbutton');
    const $message = $('#message');
    const $chatmessage = $('#chatmessage');

    $sendbutton.click(function (e) {
        //e.preventDeafult();
        //socket.emit('send message', $message.val());
        socket.emit('send message', getaes());
        $message.val(''); //发送完毕后清空输入框
    });

    socket.on('new message', function (data) {
        //$chatmessage.append('<div class="alert alert-info" role="alert">' + data.msg + '</div>');
        $chatmessage.append('<div class="alert alert-info" role="alert">' + getdaes(data.msg) + '</div>');
    });

});
//b = getdaes(a,key,iv) //解密后的字符串

