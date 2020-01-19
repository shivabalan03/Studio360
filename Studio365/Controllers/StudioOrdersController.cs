using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Studio365.Models;

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
                Products = (from l in Entity.Lookups where l.LookupID == lookupType.LookupID
                            select l).ToList();
            }
            catch(Exception ex)
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
                master = (from c in Entity.Masters where c.ProductTypes == product && c.ProductSubTypes == subProduct
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
                billNo = (billNo == 0) ? 1 : billNo;
            }
            catch(Exception ex)
            {

            }
            return Json(billNo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddBillDetails(List<Common.orderDetails> orderDetails, string BillNo)
        {
            return Json("", JsonRequestBehavior.AllowGet);
        }
    }
}