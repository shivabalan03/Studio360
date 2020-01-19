function clearFormData() {
    $("#txtRupeeTen").val("");
    $("#txtRupeetwenty").val("");
    $("#txtRupeeFifty").val("");
    $("#txtRupeeHundred").val("");
    $("#txtRupeeTwoHundred").val("");
    $("#txtRupeeFiveHundred").val("");
    $("#txtRupeeThousand").val("");
    $("#txtTwoThousand").val("");

}

function AddDenomination() {
    var rupeeDetails = {
        ten: $("#txtRupeeTen").val(),
        twenty: $("#txtRupeetwenty").val(),
        fifty: $("#txtRupeeFifty").val(),
        hundred: $("#txtRupeeHundred").val(),
        twohundred: $("#txtRupeeTwoHundred").val(),
        fivehundred: $("#txtRupeeFiveHundred").val(),
        thousand: $("#txtRupeeThousand").val(),
        twothousand: $("#txtTwoThousand").val()
    };
    $.ajax({
        url: "../Denomination/AddDenomination?UserID=U1",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(rupeeDetails),
        success: function (result) {
            return result;
        },
        complete: function (result) {
            if (result.responseJSON.Message == "Successfully Added..!") {
                alert(result.responseJSON.Message);
            } else {
                alert(result.responseJSON.Message);
            }
            //clearFormData()
        },
        error: function (xhr) {
        }
    });
};

function BindDenominations() {
    $.ajax({
        url: "../Denomination/GetDenominations",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            var html = "";
            $.each(result.responseJSON, function (i, v) {
                var jsonBody = JSON.parse(v.RupeeCounts);
                html += "<tr>"
                html += "<td>" + (++i) + "</td>"
                html += "<td>" + v["Date"] + "</td>"
                html += "<td>" + jsonBody["ten"] + "</td>"
                html += "<td>" + (jsonBody["twenty"] == null ? "0" : jsonBody["twenty"])  + "</td>"
                html += "<td>" + (jsonBody["fifty"] == null ? "0" : jsonBody["fifty"]) + "</td>"
                html += "<td>" + (jsonBody["hundred"] == null ? "0" : jsonBody["hundred"]) + "</td>"
                html += "<td>" + (jsonBody["twohundred"] == null ? "0" : jsonBody["twohundred"]) + "</td>"
                html += "<td>" + (jsonBody["fivehundred"] == null ? "0" : jsonBody["fivehundred"]) + "</td>"
                html += "<td>" + (jsonBody["thousand"] == null ? "0" : jsonBody["thousand"]) + "</td>"
                html += "<td>" + (jsonBody["twothousand"] == null ? "0" : jsonBody["twothousand"]) + "</td>"
                html += "<td><button type='button' class='btn btn-xs btn-danger btnDelete' data-sno="+ v["Sno"] +"><i class='fa fa-trash'></i></button></td>"
                html += "</tr>"
            });
            $("#tblDenomination tbody").html(html);
        },
        error: function (xhr) {
        }
    });
}

function DeleteDenomination(id) {
    $.ajax({
        url: "../Denomination/DeleteDenomination?Sno="+id,
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            if (result.responseJSON.Message == "Successfully Deleted..!") {
                toastr.success(result.responseJSON.Message);
            } else {
                toastr.error(result.responseJSON.Message);
            }
        },
        error: function (xhr) {
        }
    });
}

$(document).ready(function () {
    BindDenominations();
    $("#btnAddDenomination").click(function () {
        AddDenomination();
    });
});



$(document).on('click', '.btnDelete', function () {
    DeleteDenomination($(this).attr('data-Sno'));
});