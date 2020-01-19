using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static Studio365.Controllers.Common;
using Studio365.Models;
using Newtonsoft.Json;

namespace Studio365.Controllers
{
    public class DenominationController : Controller
    {
        // GET: Denomination
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult AddDenomination(RupeeDetails rupeeDetails, string UserID)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData()
            {
                Message = common.SuccessMessage,
                ReturnType = common.ReturnTypeMessage
            };
            try
            {
                int denominationCount = (from d in Entity.Denominations where d.Date == DateTime.Now select d).Count();
                if(denominationCount == 0)
                {
                    Denomination denomination = new Denomination()
                    {
                        RupeeCounts = JsonConvert.SerializeObject(rupeeDetails),
                        userID = UserID,
                        Date = DateTime.Now
                    };
                    Entity.Denominations.Add(denomination);
                    Entity.SaveChanges();
                }
                else
                {
                    responseData.Message = common.duplicateDenomination;
                }
            }
            catch(Exception ex)
            {
                responseData.Message = ex.Message.ToString();
            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDenominations()
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            List<Denomination> denominations = new List<Denomination>();
            try
            {
                denominations = (from d in Entity.Denominations select d).ToList();
            }
            catch(Exception ex)
            {

            }
            return Json(denominations, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteDenomination(string Sno)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage
            };
            try
            {
                var denomination = (from d in Entity.Denominations where d.Sno == Int32.Parse(Sno) select d).FirstOrDefault();
                Entity.Denominations.Remove(denomination);
                Entity.SaveChanges();
                responseData.Message = common.SuccessMessageDelete;

            }
            catch(Exception ex)
            {
                responseData.Message = ex.Message.ToString();
            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }
    }
}