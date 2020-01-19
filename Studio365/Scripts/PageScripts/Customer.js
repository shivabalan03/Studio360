function GetCustomerDetails() {
    $.ajax({
        url: "../Customer/GetCustomerDetails",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            var tblMaster = "";
            var index = 1;
            $.each(result.responseJSON, function (i, v) {
                tblMaster += "<tr>"
                tblMaster += "<td>" + index + "</td>"
                tblMaster += "<td>" + v["Name"] + "</td>"
                tblMaster += "<td>" + v["Mobile"] + "</td>"
                tblMaster += "<td>" + v["EmailID"] + "</td>"
                tblMaster += "<td><button type='button' id='" + v["Sno"] + "' class='btn btn-xs btn-danger btnDelete'><i class='fa fa-trash'></i></td>"
                tblMaster += "</tr>";
                index = index + 1;
            });
            

            $('#tblCustomerDetails tfoot th').each(function () {
                var title = $(this).text();
                if (title != "Options" && title != "Sno") {
                    $(this).html('<input type="text" class="form-control" placeholder="Search ' + title + '" />');
                } else {
                    $(this).html("");
                }

            });
            $("#tblCustomerDetails tbody").html(tblMaster);
            var tblMasterDetails = $("#tblCustomerDetails").DataTable();
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

function AddNewCustomer() {
    var customer = {
        Name: $("#txtCustomerName").val(),
        Mobile: $("#txtCustomerMobile").val(),
        Price: $("#textareaCustomerAddress").val(),
        Address: $("#textareaCustomerAddress").val(),
        EmailID: $("#txtCustomerEmail").val(),
    }
    $.ajax({
        url: "../Customer/AddCustomerDetails",
        type: "POST",
        data: JSON.stringify(customer),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            alert(result.responseJSON.Message);
            GetCustomerDetails();
        },
        error: function (xhr) {
        }
    });
}

$(document).on("click", ".btnDelete", function () {
    var id = parseInt($(this).attr('id'));
    $.ajax({
        url: "../Customer/DeleteCustomer?id=" + id,
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            if (result.responseJSON.Message == "Successfully Deleted..!") {
                alert(result.responseJSON.Message);
                GetCustomerDetails();
            }
        },
        error: function (xhr) {
        }
    });
});

$(document).ready(function () {
    GetCustomerDetails();
    $("#formCustomer").submit(function () {
        switch (this.id) {
            case "formCustomer":
                AddNewCustomer();
                break;
        }
    });
});