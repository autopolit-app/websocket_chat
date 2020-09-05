$(function () {
    const socket = io.connect();
})


key = CryptoJS.SHA256($("#password").val()).toString().substring(1, 17)
iv = CryptoJS.SHA256($("#password").val()).toString().substring(21, 37)

data = $("#message").val()


function getaes() { //加密
    data = $("#message").val()
    key = CryptoJS.SHA256($("#password").val()).toString().substring(0, 16)
    iv = CryptoJS.SHA256($("#password").val()).toString().substring(17, 33)
    var encrypted = CryptoJS.AES.encrypt(data, key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();
}



//a = getaes(data) //得到加密后的字符串

function getdaes(a) {//解密
    key = CryptoJS.SHA256($("#password").val()).toString().substring(0, 16)
    iv = CryptoJS.SHA256($("#password").val()).toString().substring(17, 33)
    var decrypted = CryptoJS.AES.decrypt(a, key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

//b = getdaes(a,key,iv)


function connect() {
    var code_len = $("#code").val().length;
    if (code_len > 5000) {
        alert("代码超过500个字符");
    } else {
        $.ajax({
            //ajax异步需要调整
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "/connect",
            data: $('#form').serialize(),
            success: function (result) {
                $("#download_box").removeClass("d-none");
                console.log(result.order);
                $("#download_body").text(result.order);
                $("#download_url").attr({
                    "href": "download/" + result.order + ".zip"
                });
            },
            error: function () {//这里还有问题
                alert("Ajax失败，请发邮件service#pyfile.com 感谢");
            }
        });
    };
}

