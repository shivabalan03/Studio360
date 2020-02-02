using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Studio365.Controllers
{
    public class Common
    {
        public class ResponseData
        {
            public string ReturnType { get; set; }
            public List<string> Content { get; set; }
            public string Message { get; set; }
        }

        public class productInformation
        {
            public int ID { get; set; }
            public string lookup { get; set; }
        }

        public class RupeeDetails
        {
            public string ten { get; set; }
            public string twenty { get; set; }
            public string fifty { get; set; }
            public string hundred { get; set; }
            public string twohundred { get; set; }
            public string fivehundred { get; set; }
            public string thousand { get; set; }
            public string twothousand { get; set; }
        }

        public class studioDetails
        {
            public string studioName { get; set; }
            public string studioMobile { get; set; }
            public string studioLandline { get; set; }
            public string studioAddress { get; set; }
        }

        public class CommonOrderDetails
        {
            
        }

        public class ProductSubProductItems
        {
            public string Product { get; set; }
            public string SubProduct { get; set; }
        }

        public class orderDetails
        {
            public string Product { get; set; }
            public string Subproduct { get; set; }
            public string Quantity { get; set; }
            public string Price { get; set; }
            public string GST { get; set; }
            public string Total { get; set; }

            public string customerName { get; set; }
            public string customerMobile { get; set; }
            public string Discount { get; set; }
            public string AdvanceAmount { get; set; }
        }


        public string SuccessMessage = "Successfully Added..!";
        public string SuccessMessageDelete = "Successfully Deleted..!";
        public string FailureMessage = "Something went wrong..!";
        public string ReturnTypeMessage = "Message";
        public string ReturnTypeDropdown = "Dropdown";
        public string statusActive = "Active";
        public string statusInactive = "Inactive";
        public string lookupProduct = "Product";
        public string lookupSubProduct = "SubProduct";
        public string lookupMarriageProduct = "Marriage-Product";
        public string lookupMarriageSubProduct = "Marriage-SubProduct";
        public string duplicateDenomination = "Already added for the day";
        public string loginSuccess = "Login Successfully..!";
        public string loginFailure = "Please check your credentials..!";
        public string studioEntry = "Studio Entry";
    }

    
}