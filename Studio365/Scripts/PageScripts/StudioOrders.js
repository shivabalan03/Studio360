var product = "";
var subProduct = "";
function GetProductDetails() {
    $.ajax({
        url: "../StudioOrders/GetProductDetails",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            var btnGroup = "";
            $.each(result.responseJSON, function (i, v) {
                btnGroup += '<label class="btn btn-sm btn-info btnProduct"  data-sno="' + v["Sno"] + '" data-value="' + v["Lookups"] + '" style="margin: 5px"><input type="radio" style="display:none" name="Products" id="'+v["Sno"]+'" autocomplete="off" >' + v["Lookups"] + '</label >'
            });
            $("#btnGroupProduct").html(btnGroup);
        },
        error: function (xhr) {
        }
    });
}

function GetSubProductDetails(product) {
    $.ajax({
        url: "../StudioOrders/GetSubProductDetails?Product=" + product,
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            var btnGroup = "";
            $.each(result.responseJSON, function (i, v) {
                btnGroup += '<label class="btn btn-sm btn-info btnSubProduct"  data-sno="' + v["Sno"] + '" data-value="' + v["ProductSubTypes"] + '" style="margin: 5px;"><input type="radio" style="display:none" autocomplete="off" >' + v["ProductSubTypes"] + '</label >'
            });
            $("#btnGroupSubProducts").html(btnGroup);
        },
        error: function (xhr) {
        }
    });
}


function GetCustomerName(mobileNo) {
    $.ajax({
        url: "../StudioOrders/GetCustomerName?mobileNumber=" + mobileNo,
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            if (result.responseJSON != "") {
                $("#txtCustomerName").val(result.responseJSON);
            }
        },
        error: function (xhr) {
        }
    });
}


function GenerateBillNo() {
    $.ajax({
        url: "../StudioOrders/GetBillNo",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            if (result.responseJSON != "") {
                $("#lblBillNo").html("B-" + result.responseJSON);
            }
        },
        error: function (xhr) {
        }
    });
}

function GetItemDetails(product, subProduct) {
    $.ajax({
        url: "../StudioOrders/GetItemDetails?product=" + product + "&subProduct=" + subProduct,
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            return result;
        },
        complete: function (result) {
            var quantity = $("#txtQty").val() == "" ? 1 : $("#txtQty").val();
            var currentProduct = result.responseJSON.ProductTypes;
            var currentSubProduct = result.responseJSON.ProductSubTypes;
            var price = result.responseJSON.Price;
            var gst = result.responseJSON.GST;
            var trHTML = "";
            trHTML += "<tr>"
            trHTML += "<td>" + ($("#tblorderDetails tbody")[0].rows.length + 1) + "</td>"
            trHTML += "<td>" + currentProduct+ "</td>"
            trHTML += "<td>" + currentSubProduct+ "</td>"
            trHTML += "<td>" + quantity + "</td>"
            trHTML += "<td>" + price + "</td>"
            trHTML += "<td>" + gst + "</td>"
            trHTML += "<td>" + (quantity * price) + "</td>"
            trHTML += '<td><button type="button" id="' + result.responseJSON.Sno+'" class="btn btn-xs btn-danger btnDelete"><i class="fa fa-trash"></i></button></td>';
            trHTML += "</tr>"
            $("#tblorderDetails tbody").append(trHTML);
        },
        error: function (xhr) {
        }
    });
}

function AddBillDetails() {
    var object = [];
    $.each($("tblorderDetails tbody tr"), function (i, tr) {
        var orders = {
            Product: tr.find('td').eq(1).innerText,
            Subproduct: tr.find('td').eq(2).innerText,
            Quantity: tr.find('td').eq(3).innerText,
            Price: tr.find('td').eq(4).innerText,
            GST: tr.find('td').eq(5).innerText,
            Total: tr.find('td').eq(6).innerText,
        };
        object.push(orders);
    });
    $.ajax({
        url: "../StudioOrders/AddBillDetails?BillNo=" + $("#lblBillNo")[0].innerText,
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(object),
        success: function (result) {
            return result;
        },
        complete: function (result) {
            
        },
        error: function (xhr) {
        }
    });
}

function PrintBill() {
    AddBillDetails();
    var headerHTML = "<table class='table table-condensed' id='printClass'>"
    headerHTML += "<tr><td style='width:25%'>Customer Name : </td><td>Name 1</td> <td></td> <td rowspan='3'>Studio Name</td></tr>"
    headerHTML += "<tr><td>Customer Mobile : </td><td>9942667746</td> <td></td></tr>"
    headerHTML += "<tr><td>Bill no : </td><td>" + $("#lblBillNo")[0].innerText +"</td> <td></td></tr></tbody></table>"


    headerHTML += "<table class='table table-bordered table-condensed' style='width:100%'>"
    headerHTML += "<tr><td  colspan=''>Sno</td>"
    headerHTML += "<td colspan=''>Product</td>"
    headerHTML += "<td colspan=''>Sub Product</td>"
    headerHTML += "<td colspan=''>Quantity</td>"
    headerHTML += "<td colspan=''>GST</td>"
    headerHTML += "<td colspan=''>Price</td>"
    headerHTML += "<td colspan=''>Total</td></tr>"

    $.each($("#tblorderDetails tbody tr"), function(i , v) {
        headerHTML += "<tr><td style='width:5%'>" + $(v).find('td').eq(0)[0].innerText + "</td>"
        headerHTML += "<td style='width:22%'>" + $(v).find('td').eq(1)[0].innerText + "</td>"
        headerHTML += "<td style='width:22%'>" + $(v).find('td').eq(2)[0].innerText + "</td>"
        headerHTML += "<td style='width:22%'>" + $(v).find('td').eq(3)[0].innerText + "</td>"
        headerHTML += "<td style='width:15%'>" + $(v).find('td').eq(4)[0].innerText + "</td>"
        headerHTML += "<td style='width:15%'>" + $(v).find('td').eq(5)[0].innerText + "</td>"
        headerHTML += "<td style='width:15%'>" + $(v).find('td').eq(6)[0].innerText + "</td>"
        headerHTML += "</tr>"
    });
    

    headerHTML += "<tr><td colspan='5' style='text-align:right'> Total Amount </td><td colspan='2'>total Amount</td></tr>"
    headerHTML += "<tr><td colspan='5' style='text-align:right'> Advance Amount </td><td colspan='2'Advance Amount</td></tr>"
    headerHTML += "<tr><td colspan='5' style='text-align:right'> Discount Amount </td><td colspan='2'>Discount Amount</td></tr>"
    headerHTML += "<tr><td colspan='5' style='text-align:right'> Balance Amount </td><td colspan='2'Balance Amount</td></tr></table>"

    document.body.innerHTML = headerHTML
    window.print();
    window.location.href = "../StudioOrders/Index";
    GenerateBillNo();
}

$(document).ready(function () {
    GetProductDetails();
    GenerateBillNo();
    $("#btnAddItem").click(function () {
        if (product == "") {
            alert("Please Choose Product");
        } else if (subProduct == "") {
            alert("Please Choose Sub Product");
        } else {
            GetItemDetails(product, subProduct);
        }
    });

    function clearForms() {
        $("#txtProduct").val("");
        $("#txtSubProduct").val("");
        $("#txtPrice").val("");
        $("#txtQuantity").val("");
        $("#txtGST").val("");
        $("#txtTotal").val("");
    }

    $("#btnAddManualProduct").click(function () {
        var txtProduct = $("#txtProduct").val();
        var txtSubProduct = $("#txtSubProduct").val();
        var txtPrice = $("#txtPrice").val();
        var txtQty = $("#txtQuantity").val();
        if (txtProduct == "" && txtSubProduct == "") {
            alert("Please Enter Product or Sub Product");
        } else if (txtPrice == "") {
            alert("Please Enter Price")
        } else {
            $("#txtTotal").val(parseInt(txtPrice) * parseInt(txtQty));
            var trHTML = "";
            trHTML += "<tr>"
            trHTML += "<td>" + ($("#tblorderDetails tbody")[0].rows.length + 1) + "</td>"
            trHTML += "<td>" + txtProduct + "</td>"
            trHTML += "<td>" + txtSubProduct + "</td>"
            trHTML += "<td>" + txtQty + "</td>"
            trHTML += "<td>" + txtPrice + "</td>"
            trHTML += "<td>" + $("#txtGST").val(); + "</td>"
            trHTML += "<td>" + parseInt(txtPrice) * parseInt(txtQty) + "</td>"
            trHTML += '<td><button type="button" class="btn btn-xs btn-danger btnDelete"><i class="fa fa-trash"></i></button></td>';
            trHTML += "</tr>"
            $("#tblorderDetails tbody").append(trHTML);
            clearForms();
        }
    });

    $("#btnPrint").click(function () {
        var trCount = $("tblorderDetails tbody tr").length;
        if (trCount > 0) {
            PrintBill();
        } else {
            toastr.error("Please Enter Order Details");
        };
    });
});

$(document).on('click', '.btnProduct', function () {
    GetSubProductDetails($(this).attr('data-value'));
    product = $(this).attr('data-value');
});

$(document).on('click', '.btnSubProduct', function () {
    //GetSubProductDetails($(this).attr('data-value'));
    subProduct = $(this).attr('data-value');
});

$(document).on('click', '.btnDelete', function () {
    $(this).parents('tr').remove();
});

$(document).on('keydown', '#txtCustomerMobile', function () {
    var mobileNumber = $(this).val();
    if (mobileNumber.length == 10) {
        GetCustomerName(mobileNumber);
    }
});


