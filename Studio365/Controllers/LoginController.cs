using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Studio365.Models;
using static Studio365.Controllers.Common;

namespace Studio365.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Login()
        {
            return View();
        }

        public JsonResult SignIn(string userName, string password)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage,
            };
            try
            {
                int userExist = (from u in Entity.UsersDetails
                                 where u.MobileNumber == userName && u.Password == password
                                 select u).Count();
                if(userExist == 0)
                {
                    responseData.Message = common.loginFailure;
                }
                else
                {
                    responseData.Message = common.loginSuccess;
                    UsersDetail user = (from u in Entity.UsersDetails
                                            where u.MobileNumber == userName && u.Password == password
                                            select u).FirstOrDefault();
                    List<string> lstUser = new List<string>()
                    {
                        user.Name,
                        user.JoinDate.ToString(),
                        user.MobileNumber,
                    };
                    responseData.Content = lstUser;
                }
            }
            catch(Exception ex)
            {

            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }
    }
}