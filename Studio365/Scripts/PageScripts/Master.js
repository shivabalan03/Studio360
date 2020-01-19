function AddProduct() {
    $.ajax({
        url: "../Master/AddNewProduct?Product=" + $("#txtProduct").val(),
        type: "POST",
        data: JSON.stringify(""),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            if (result.responseJSON.ReturnType == "Message") {
                bindDropDown("#ddProduct", result.responseJSON.Content);
            }
        },
        error: function (xhr) {
        }
    });
}

function AddSubProduct() {
    $.ajax({
        url: "../Master/AddNewSubProduct?SubProduct=" + $("#txtSubProduct").val(),
        type: "POST",
        data: JSON.stringify(""),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            if (result.responseJSON.ReturnType == "Message") {
                bindDropDown("#ddSubProduct", result.responseJSON.Content);
            }
        },
        error: function (xhr) {
        }
    });
}

function bindProductDropdown() {
    $.ajax({
        url: "../Master/GetProductDetails",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            if (result.responseJSON.ReturnType == "") {
                bindDropDown("#ddProduct", result.responseJSON.Content);
            }
        },
        error: function (xhr) {
        }
    });
}

function bindSubProductDropdown() {
    $.ajax({
        url: "../Master/GetSubProductDetails",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            if (result.responseJSON.ReturnType == "") {
                bindDropDown("#ddSubProduct", result.responseJSON.Content);
            }
        },
        error: function (xhr) {
        }
    });
}

function AddMaster() {
    var master = {
        ProductTypes : $("#ddProduct :selected").val(),
        ProductSubTypes : $("#ddSubProduct :selected").val(),
        Price : $("#txtPrice").val(),
        GST : $("#txtGST").val(),
        Status : "Active",
    }
    $.ajax({
        url: "../Master/AddMasterDetails",
        type: "POST",
        data: JSON.stringify(master),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            if (result.responseJSON.Message == "Successfully Added..!") {
                alert(result.responseJSON.Message);
            }
            bindProductDetails();
        },
        error: function (xhr) {
        }
    });
}

function bindProductDetails() {
    $.ajax({
        url: "../Master/GetMasterDetails",
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
                tblMaster += "<td>" + v["ProductTypes"] + "</td>"
                tblMaster += "<td>" + v["ProductSubTypes"] + "</td>"
                tblMaster += "<td>" + v["Price"] + "</td>"
                tblMaster += "<td>" + v["GST"] + "</td>"
                tblMaster += "<td><button type='button' id='"+ v["Sno"] +"' class='btn btn-xs btn-danger btnDelete'><i class='fa fa-trash'></i></td>"
                tblMaster += "</tr>";
                index = index+1;
            });

            $('#tblMasterDetails tfoot th').each(function () {
                var title = $(this).text();
                if (title != "Options" && title != "Sno") {
                    $(this).html('<input type="text" class="form-control" placeholder="Search ' + title + '" />');
                } else {
                    $(this).html("");
                }
                
            });

            $("#tblMasterDetails tbody").html(tblMaster);
            var tblMasterDetails = $("#tblMasterDetails").DataTable();
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
        url: "../Master/DeleteMaster?id=" + id,
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            if (result.responseJSON.Message == "Successfully Deleted..!") {
                alert(result.responseJSON.Message);
            }
            bindProductDetails();
        },
        error: function (xhr) {
        }
    });
});

$(document).ready(function () {
    bindProductDropdown();
    bindSubProductDropdown();
    bindProductDetails();
    
    var selectors = "#btnNewAddProduct, #btnAddSubProduct, #masterImport, #btnprint";
    $(selectors).click(function () {
        switch (this.id) {
            case "btnNewAddProduct":
                AddProduct();
                break;
            case "btnAddSubProduct":
                AddSubProduct();
                break;
            case "masterImport":
                masterImport();
                break;
            case "btnprint":
                toastr.success('Rajesh says... Have fun!')
                break;
        }
    });

    var selector = "#formAddMaster";
    $(selector).submit(function () {
        switch (this.id) {
            case "formAddMaster":
                var Product = $("#ddProduct :selected").val();
                var SubProduct = $("#ddSubProduct :selected").val();
                if (Product == "Select") {
                    alert("Please Choose Product");
                } else if (SubProduct == "Select") {
                    alert("Please Choose Sub Product");
                } else {
                    AddMaster();
                }
                break;
        }
    });
});

