function orderDetails() {
    $.ajax({
        url: "../StudioOrders/GetOrdersDetails",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            var html = "";
            $.each(result.responseJSON, function (i, v) {
                html += "<tr>"
                html += "<td>" + (++i) +"</td>"
                html += "<td>" + v["BillNo"] + "</td>"
                html += "<td>" + v["CustomerName"] +"</td>"
                html += "<td>" + v["CustomerMobile"]+ "</td>"
                html += "<td>" + v["Date"]+ "</td>"
                html += "<td>" + v["Total"] +"</td>"
                html += "<td><button type='button' class='btn btn-xs btn-primary mdlTransactionDetails' data-billNo=" + v["BillNo"]+" data-toggle='modal' data-target='#modal-Import'><i class='fa fa-rupee'></i></button></td>"
                html += "</tr>"
            });
            
            $('#tblOrdersDetails tfoot th').each(function () {
                var title = $(this).text();
                if (title != "Options" && title != "Sno" && title != "Total Purchase Amount") {
                    $(this).html('<input type="text" class="form-control" style="width:180px" placeholder="Search ' + title + '" />');
                } else {
                    $(this).html("");
                }
            });

            $("#tblOrdersDetails tbody").html(html);
            var tblMasterDetails = $("#tblOrdersDetails").DataTable();
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
};

function GetTransactionDetails(billNo) {
    $.ajax({
        url: "../StudioOrders/GetTransactionDetails?billNo=" + billNo,
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            var tbody = "";
            $.each(result, function (i, v) {
                tbody += "<tr>"
                tbody += "<td>" + ++i + "</td>"
                tbody += "<td>" + v["Date"] + "</td>"
                tbody += "<td>" + v["Amount"] + "</td>"
                tbody += "</tr>"
            });
            $("#tblTransactionDetails tbody").html(tbody);
        },
        complete: function () {

        },
        error: function () {

        }
    });
}

function AddHistory(amount, billNo) {
    $.ajax({
        url: "../StudioOrders/AddHistoryDetails?BillNo=" + billNo + "&Amount=" + amount,
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result.Message == "Successfully Added..!") {
                toastr.success(result.Message)
            } else {
                toastr.error(result.Message);
            }
        },
        complete: function () {

        },
        error: function () {

        }
    });
}

$(document).ready(function () {
    orderDetails();

    $("#btnAddAmount").click(function () {
        var amount = $("#txtAmount").val();
        var billNo = $("#lblBillNo").text();
        if (amount == "") {
            toastr.success('Please Enter Amount');
        } else {
            AddHistory(amount, billNo);
        }
    });
});

$(document).on("click", ".mdlTransactionDetails", function () {
    $("#txtAmount").val("");
    $("#txtAmount").focus();
    var billNo = $(this).attr('data-billNo');
    $("#lblBillNo").html(billNo);
    GetTransactionDetails(billNo);
})