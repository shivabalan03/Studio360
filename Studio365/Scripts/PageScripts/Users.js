function addUser() {
    var user = {
        Name: $("#txtUserName").val(),
        MobileNumber: $("#txtUserMobile").val(),
        Salary: $("#txtUserSalary").val(),
        Userrole: $("#ddUserRole :selected").val(),
        Gender: $("#ddGender :selected").val(),
        Status: "Active",
        JoinDate: $("#dateJoinDate").val(),
        Password: $("#txtUserPassword").val()
    }
    $.ajax({
        url: "../Users/AddUser",
        type: "POST",
        data: JSON.stringify(user),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            if (result.responseJSON.Message == "Successfully Added..!") {
                alert(result.responseJSON.Message);
            } else {
                alert(result.responseJSON.Message)
            }
            GetUserDetails();
        },
        error: function (xhr) {
        }
    });
}

function GetUserDetails() {
    $.ajax({
        url: "../Users/GetUserDetails",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            var tblUsers = "";
            var index = 1;
            $.each(result.responseJSON, function (i, v) {
                tblUsers += "<tr>"
                tblUsers += "<td>" + index + "</td>"
                tblUsers += "<td>" + v["Name"] + "</td>"
                tblUsers += "<td>" + v["MobileNumber"] + "</td>"
                tblUsers += "<td>" + v["Gender"] + "</td>"
                tblUsers += "<td>" + v["Userrole"] + "</td>"
                tblUsers += "<td>" + v["JoinDate"] + "</td>"
                tblUsers += "<td><button type='button' class='btn btn-danger btn-xs btnDelete' id='"+v["Sno"]+"'><i class='fa fa-trash'></i></button></td>"
                tblUsers += "</tr>";
                index = index + 1;
            });
            

            $('#tblUsersDetails tfoot th').each(function () {
                var title = $(this).text();
                if (title != "Options" && title != "Sno" && title != "Date of Join") {
                    $(this).html('<input type="text" class="form-control" placeholder="Search ' + title + '" />');
                } else {
                    $(this).html("");
                }

            });
            $("#tblUsersDetails tbody").html(tblUsers);
            var tblMasterDetails = $("#tblUsersDetails").DataTable();
            // Apply the search
            tblMasterDetails.columns().every(function () {
                var that = this;
                $('input', this.footer()).on('keyup change clear', function () {
                    if (that.search() !== this.value) {
                        that.search(this.value).draw();
                    }
                });
            });
        },
        error: function (xhr) {
        }
    });
}


$(document).on("click", ".btnDelete", function () {
    var id = parseInt($(this).attr('id'));
    $.ajax({
        url: "../Users/DeleteUser?id=" + id,
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            if (result.responseJSON.Message == "Successfully Deleted..!") {
                alert(result.responseJSON.Message);
                GetUserDetails();
            }
        },
        error: function (xhr) {
        }
    });
});

$(document).ready(function () {
    GetUserDetails();
    $("#formUsers").submit(function () {
        switch (this.id) {
            case "formUsers":
                addUser();
                break;
        };
    });
});