function bindDropDown(id, Content) {
    var ddHTMLOptions = "<option value='Select'>Select</option>"
    $.each(Content, function (i, v) {
        ddHTMLOptions += "<option value='" + v + "'>" + v + "</option>"
    });
    $(id).html(ddHTMLOptions);


}

function AddStudioDetails() {
    var studioName= $("#txtStudioName").val();
    var studioMobile= $("#txtStudioMobile").val();
    var studioLandline= $("#txtStudioLandline").val();
    var studioAddress= $("#textareaStudioAddress").val();
    
    if (studioName == "") {
        toastr.error("Please Enter Studio Name");
    } else if (studioMobile == "") {
        toastr.error("Please Enter Studio Mobile");
    } else if (studioAddress == "") {
        toastr.error("Please Enter Studio Address");
    } else {
        var studioDetails = {
            studioName: studioName,
            studioMobile: studioMobile,
            studioLandline: studioLandline,
            studioAddress: studioAddress
        }
        $.ajax({
            url: "../Master/AddStudioDetails",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(studioDetails),
            success: function (result) {
                return result;
            },
            complete: function (result) {
                if (result.responseJSON.Message == "Successfully Added..!") {
                    toastr.success(result.responseJSON.Message);
                } else {
                    toastr.error(result.responseJSON.Message)
                };
            },
            error: function (xhr) {
            }
        });
    }
    
}

function GetStudioDetails() {
    $.ajax({
        url: "../Master/GetStudioDetails",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            var studioDetails = JSON.parse(result.responseJSON.ItemDetails);
            $("#txtStudioName").val(studioDetails.studioName);
            $("#txtStudioMobile").val(studioDetails.studioMobile);
            $("#txtStudioLandline").val(studioDetails.studioLandline);
            $("#textareaStudioAddress").val(studioDetails.studioAddress);
        },
        error: function (xhr) {
        }
    });
}

$(document).ready(function () {
    $("#btnAddStudioDetails").click(function () {
        AddStudioDetails();
    });

    $("#mdlStudioDetails").click(function () {
        GetStudioDetails();
    })
});