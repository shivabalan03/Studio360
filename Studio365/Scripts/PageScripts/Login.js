function SignIn() {
    var userName = $("#txtUserName").val();
    var password= $("#txtPassword").val()
    
    if (userName == "") {
        toastr.error("Please Enter UserName");
        $("#txtUserName").focus();
    } else if (password == "") {
        toastr.error("Please Enter Password");
        $("#txtPassword").focus();
    } else {
        var userDetails = {
            userName: userName,
            password: password
        }
        $.ajax({
            url: "../Login/SignIn",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(userDetails),
            success: function (result) {
                return result;
            },
            complete: function (result) {
                if (result.responseJSON.Message == "Login Successfully..!") {
                    toastr.success(result.responseJSON.Message);
                    $("#lblUser").text(result.responseJSON.Content[0]);
                    $("#lblJoinDate").text(result.responseJSON.Content[1]);
                    window.location.href = "../StudioOrders/Index";
                } else {
                    toastr.error(result.responseJSON.Message);
                }
            },
            error: function (xhr) {
            }
        });
    }
    
}

$(document).ready(function () {
    $("#btnSignIN").click(function () {
        SignIn();
    });
})