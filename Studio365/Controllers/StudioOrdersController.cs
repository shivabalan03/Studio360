using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Studio365.Models;
using static Studio365.Controllers.Common;

namespace Studio365.Controllers
{
    public class StudioOrdersController : Controller
    {
        // GET: StudioOrders
        public ActionResult Index()
        {
            ViewBag.Title = "Studio Orders";
            ViewBag.SubTitle = "";
            ViewBag.Page = "Studio Orders";
            return View();
        }

        public ActionResult OrderDetails()
        {
            ViewBag.Title = "Order Details";
            ViewBag.SubTitle = "";
            ViewBag.Page = "Order Details";
            return View();
        }

        public JsonResult GetProductDetails()
        {
            Studio365Entities Entity = new Studio365Entities();
            Common common = new Common();
            List<Lookup> Products = new List<Lookup>();
            try
            {
                LookupType lookupType = new LookupType();
                lookupType = (from l in Entity.LookupTypes
                              where l.LookupType1 == common.lookupProduct
                              select l).FirstOrDefault();
                Products = (from l in Entity.Lookups
                            where l.LookupID == lookupType.LookupID
                            select l).ToList();
            }
            catch (Exception ex)
            {

            }

            return Json(Products, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSubProductDetails(string Product)
        {
            Studio365Entities Entity = new Studio365Entities();
            Common common = new Common();
            List<Master> masters = new List<Master>();
            try
            {
                masters = (from m in Entity.Masters where m.ProductTypes == Product select m).ToList();
            }
            catch (Exception ex)
            {

            }

            return Json(masters, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCustomerName(string mobileNumber)
        {
            Studio365Entities Entity = new Studio365Entities();
            Common common = new Common();
            string customerName = string.Empty;
            try
            {
                customerName = (from c in Entity.Customers where c.Mobile == mobileNumber select c.Name).FirstOrDefault();
            }
            catch (Exception ex)
            {

            }

            return Json(customerName, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetItemDetails(string product, string subProduct)
        {
            Studio365Entities Entity = new Studio365Entities();
            Common common = new Common();
            Master master = new Master();
            try
            {
                master = (from c in Entity.Masters
                          where c.ProductTypes == product && c.ProductSubTypes == subProduct
                          select c).FirstOrDefault();
            }
            catch (Exception ex)
            {

            }

            return Json(master, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBillNo()
        {
            Studio365Entities Entity = new Studio365Entities();
            Common common = new Common();
            int billNo = 1;
            try
            {
                billNo = (from o in Entity.Orders select o).Count();
                billNo = (billNo == 0) ? 1 : ++billNo;
            }
            catch (Exception ex)
            {

            }
            return Json(billNo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddHistoryDetails(string BillNo, int Amount, string EmployeeID)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage
            };
            try
            {
                History history = new History()
                {
                    Amount = Amount,
                    BillNo = BillNo,
                    Date = DateTime.Now,
                    EmployeeID = EmployeeID
                };
                Entity.Histories.Add(history);
                Entity.SaveChanges();
                responseData.Message = common.SuccessMessage;
            }
            catch (Exception ex)
            {
                responseData.Message = ex.Message.ToString();
            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddBillDetails(List<Common.orderDetails> orderDetails, string BillNo, string TotalAmount)
        {
            //Common.CommonOrderDetails orders = new Common.CommonOrderDetails();
            //orders = orderDetails[0].commonOrderDetails;
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage
            };

            try
            {
                Order order = new Order()
                {
                    BillNo = BillNo,
                    Date = DateTime.Now,
                    CustomerMobile = orderDetails[0].customerMobile,
                    CustomerName = orderDetails[0].customerName,
                    AdvanceAmount = Int32.Parse(orderDetails[0].AdvanceAmount),
                    Discount = Int32.Parse(orderDetails[0].Discount),
                    Orders = JsonConvert.SerializeObject(orderDetails),
                    Total = Int32.Parse(TotalAmount),
                    EmployeeID = "",
                };
                Entity.Orders.Add(order);
                Entity.SaveChanges();

                //Add Bill History
                AddHistoryDetails(BillNo, Int32.Parse(orderDetails[0].AdvanceAmount), "");

                //Add Customer
                Customer customer = new Customer()
                {
                    Name = orderDetails[0].customerName,
                    Mobile = orderDetails[0].customerMobile
                };

                CustomerController addCustomer = new CustomerController();
                addCustomer.AddCustomerDetails(customer);
            }
            catch (Exception ex)
            {
                responseData.Message = ex.Message.ToString();
            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOrdersDetails()
        {
            Studio365Entities Entity = new Studio365Entities();
            Common common = new Common();
            List<Order> order = new List<Order>();
            try
            {
                order = (from o in Entity.Orders select o).ToList();
            }
            catch (Exception ex)
            {

            }

            return Json(order, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTransactionDetails(string billNo)
        {
            Studio365Entities Entity = new Studio365Entities();
            Common common = new Common();
            List<History> lstHistory = new List<History>();
            try
            {   
                lstHistory = (from h in Entity.Histories where h.BillNo == billNo select h).ToList();
            }
            catch (Exception ex)
            {

            }
            return Json(lstHistory, JsonRequestBehavior.AllowGet);
        }
    }
}