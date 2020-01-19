using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static Studio365.Controllers.Common;
using Studio365.Models;

namespace Studio365.Controllers
{
    public class UsersController : Controller
    {
        // GET: Users
        public ActionResult Index()
        {
            ViewBag.Title = "Users";
            ViewBag.SubTitle = "Employee Detail";
            ViewBag.Page = "Users";
            return View();
        }

        public JsonResult AddUser(UsersDetail user)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage
            };
            try
            {
                int existing = (from u in Entity.UsersDetails where u.MobileNumber == user.MobileNumber select u).Count();
                if(existing == 0)
                {
                    Entity.UsersDetails.Add(user);
                    Entity.SaveChanges();
                    responseData.Message = common.SuccessMessage;
                }else
                {
                    responseData.Message = "Mobile Number Already Present";
                }
            }
            catch(Exception ex)
            {
                responseData.Message = ex.Message.ToString();
            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUserDetails()
        {
            Studio365Entities Entity = new Studio365Entities();
            List<UsersDetail> lstUsers = new List<UsersDetail>();
            try
            {
                lstUsers = (from u in Entity.UsersDetails select u).ToList();
            }
            catch(Exception ex)
            {

            }
            return Json(lstUsers, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteUser(int id)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage,
            };
            try
            {
                var user = (from m in Entity.UsersDetails where m.Sno == id select m).FirstOrDefault();
                Entity.UsersDetails.Remove(user);
                Entity.SaveChanges();

                responseData.Message = common.SuccessMessageDelete;
            }
            catch (Exception ex)
            {

            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }
    }
}