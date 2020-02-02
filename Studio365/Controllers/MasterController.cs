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
    public class MasterController : Controller
    {
        // GET: Master
        public ActionResult Index()
        {
            ViewBag.Title = "Studio Master";
            ViewBag.SubTitle = "Product & Sub Product Details";
            ViewBag.Page = "Master";
            return View();
        }

        public ActionResult MarriageMaster()
        {
            ViewBag.Title = "Marriage Master";
            ViewBag.SubTitle = "Product & Sub Product Details";
            ViewBag.Page = "Master";
            return View();
        }

        public JsonResult AddNewProduct(string Product, string Type)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage,
                Content = new List<string>(),
            };
            try
            {
                Lookup lookup = new Lookup();
                if(Type == "Studio")
                {
                    lookup.LookupID = Guid.Parse((from lookupType in Entity.LookupTypes
                                                  where lookupType.LookupType1 == common.lookupProduct
                                                  select lookupType.LookupID.ToString()).FirstOrDefault());
                } else
                {
                    lookup.LookupID = Guid.Parse((from lookupType in Entity.LookupTypes
                                                  where lookupType.LookupType1 == common.lookupMarriageProduct
                                                  select lookupType.LookupID.ToString()).FirstOrDefault());
                }
                
                lookup.Lookups = Product;
                int existing = (from l in Entity.Lookups where l.LookupID == lookup.LookupID && l.Lookups == Product select l).Count();
                if(existing == 0)
                {
                    Entity.Lookups.Add(lookup);
                    Entity.SaveChanges();
                    responseData.Message = common.SuccessMessage;
                } else
                {
                    responseData.Message = "Product Already Existing";
                }
                responseData.Content = (from l in Entity.Lookups where l.LookupID == lookup.LookupID select l.Lookups).ToList();
            }
            catch (Exception ex)
            {
                responseData.Message = ex.Message.ToString();
            }

            return Json(responseData, JsonRequestBehavior.AllowGet); //responseData;
        }

        public JsonResult AddNewSubProduct(string SubProduct, string Type)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage,
                Content = new List<string>(),
            };

            try
            {
                Lookup lookup = new Lookup();
                if(Type == "Studio")
                {
                    lookup.LookupID = Guid.Parse((from lookupType in Entity.LookupTypes
                                                  where lookupType.LookupType1 == common.lookupSubProduct
                                                  select lookupType.LookupID.ToString()).FirstOrDefault());
                }
                else {
                    lookup.LookupID = Guid.Parse((from lookupType in Entity.LookupTypes
                                                  where lookupType.LookupType1 == common.lookupMarriageSubProduct
                                                  select lookupType.LookupID.ToString()).FirstOrDefault());
                }
                lookup.Lookups = SubProduct;
                int existing = (from lt in Entity.Lookups where lt.LookupID == lookup.LookupID && lt.Lookups == SubProduct select lt).Count();
                if(existing == 0)
                {
                    Entity.Lookups.Add(lookup);
                    Entity.SaveChanges();
                    responseData.Message = common.SuccessMessage;
                } else
                {
                    responseData.Message = "SubProduct Already Existing";
                }
                responseData.Content = (from lp in Entity.Lookups where lp.LookupID == lookup.LookupID select lp.Lookups).ToList();
            }
            catch (Exception ex)
            {
                responseData.Message = ex.Message.ToString();
            }

            return Json(responseData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProductDetails(string Type)
       {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData();
            try
            {
                responseData.ReturnType = "";
                responseData.Message = common.SuccessMessage;
                Guid lookupID = Guid.NewGuid();
                if(Type == "Studio")
                {
                    lookupID = Guid.Parse((from l in Entity.LookupTypes
                                                where l.LookupType1 == common.lookupProduct
                                                select l.LookupID.ToString()).FirstOrDefault());
                    responseData.Content = (from lp in Entity.Lookups where lp.LookupID == lookupID select lp.Lookups).ToList();
                } else
                {
                    lookupID = Guid.Parse((from l in Entity.LookupTypes
                                           where l.LookupType1 == common.lookupMarriageProduct
                                           select l.LookupID.ToString()).FirstOrDefault());
                    responseData.Content = (from lp in Entity.Lookups where lp.LookupID == lookupID select lp.Lookups).ToList();
                }
            }
            catch(Exception ex)
            {

            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSubProductDetails(string Type)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData();
            try
            {
                responseData.ReturnType = "";
                responseData.Message = common.SuccessMessage;
                Guid lookupID = Guid.NewGuid();
                if(Type == "Studio")
                {
                    lookupID = Guid.Parse((from l in Entity.LookupTypes
                                                where l.LookupType1 == common.lookupSubProduct
                                                select l.LookupID.ToString()).FirstOrDefault());
                    responseData.Content = (from lp in Entity.Lookups where lp.LookupID == lookupID select lp.Lookups).ToList();
                } else
                {
                    lookupID = Guid.Parse((from l in Entity.LookupTypes
                                                where l.LookupType1 == common.lookupMarriageSubProduct
                                                select l.LookupID.ToString()).FirstOrDefault());
                    responseData.Content = (from lp in Entity.Lookups where lp.LookupID == lookupID select lp.Lookups).ToList();
                }
                
            }
            catch (Exception ex)
            {

            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddMasterDetails(Master master, string Type)
        {
            Common common = new Common();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage,
            };

            try
            {
                master.Status = common.statusActive;
                master.Type = Type;
                Studio365Entities entity = new Studio365Entities();
                entity.Masters.Add(master);
                entity.SaveChanges();
                responseData.Message = common.SuccessMessage;
            }
            catch (Exception ex)
            {
                responseData.Message = ex.Message.ToString();
            }

            return Json(responseData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMasterDetails(string Type)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            List<Master> lstMaster = new List<Master>();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage,
            };
            try
            {
                lstMaster = (from m in Entity.Masters where m.Type == Type select m).ToList();
            }
            catch(Exception ex)
            {

            }
            return Json(lstMaster, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteMaster(int id)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage,
            };
            try
            {
                var master = (from m in Entity.Masters where m.Sno == id select m).FirstOrDefault();
                Entity.Masters.Remove(master);
                Entity.SaveChanges();

                responseData.Message = common.SuccessMessageDelete;
            }
            catch(Exception ex)
            {

            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddStudioDetails(studioDetails studioDetails)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            commonDetail commonDetail = new commonDetail();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.ReturnTypeMessage,
            };
            try
            {
                int count = (from c in Entity.commonDetails where c.Name == common.studioEntry select c).Count();
                if(count > 0)
                {
                    commonDetail = (from c in Entity.commonDetails where c.Name == common.studioEntry select c).FirstOrDefault();
                    commonDetail.ItemDetails = JsonConvert.SerializeObject(studioDetails);
                } else
                {
                    commonDetail.Name = common.studioEntry;
                    commonDetail.ItemDetails = JsonConvert.SerializeObject(studioDetails);
                    Entity.commonDetails.Add(commonDetail);
                }                
                Entity.SaveChanges();
                responseData.Message = common.SuccessMessage;
            }
            catch(Exception ex)
            {
                responseData.Message = common.FailureMessage;
            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStudioDetails()
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            commonDetail commonDetail = new commonDetail();
            try
            {
                commonDetail = (from c in Entity.commonDetails where c.Name == common.studioEntry select c).FirstOrDefault();
            }
            catch(Exception ex)
            {

            }
            return Json(commonDetail, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddPackageDetails(List<ProductSubProductItems> lstProductSubProductItems, string PackageName)
        {
            Common common = new Common();
            Studio365Entities Entity = new Studio365Entities();
            ResponseData responseData = new ResponseData()
            {
                ReturnType = common.SuccessMessage
            };
            try
            {
                PackageConfiguration package = new PackageConfiguration()
                {
                    PackageName = PackageName,
                    PackageDetails = JsonConvert.SerializeObject(lstProductSubProductItems),
                    Date = DateTime.Now,
                    EmployeeID = "",
                };
                Entity.PackageConfigurations.Add(package);
                Entity.SaveChanges();
                responseData.Message = common.SuccessMessage;
            }
            catch(Exception ex)
            {
                responseData.Message = ex.Message.ToString();
            }
            return Json(responseData, JsonRequestBehavior.AllowGet);
        }
    }
}