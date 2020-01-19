using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Studio365.Models;
using static Studio365.Controllers.Common;

namespace Studio365.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Customer
        public ActionResult Index()
        {
            ViewBag.Title = "Customers Details";
            ViewBag.SubTitle = "";
            ViewBag.Page = "Customers";
            return View();
        }

        public JsonResult GetCustomerDetails()
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            List<Customer> lstCustomer = new List<Customer>();
            try
            {
                lstCustomer = (from c in Entity.Customers select c).ToList();
            }
            catch(Exception ex)
            {

            }
            return Json(lstCustomer, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddCustomerDetails(Customer customer)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage,
            };
            try
            {
                int existingCustomer = (from c in Entity.Customers where c.Mobile == customer.Mobile select c).Count();
                if(existingCustomer == 0)
                {
                    Entity.Customers.Add(customer);
                    Entity.SaveChanges();
                    responseData.Message = common.SuccessMessage;
                }
                else
                {
                    responseData.Message = "Customer Already Available..!";
                }
            }
            catch(Exception ex)
            {

            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteCustomer(int id)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage,
            };
            try
            {
                var customer = (from m in Entity.Customers where m.Sno == id select m).FirstOrDefault();
                Entity.Customers.Remove(customer);
                Entity.SaveChanges();

                responseData.Message = common.SuccessMessageDelete;
            }
            catch(Exception ex)
            {

            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }
    }
}