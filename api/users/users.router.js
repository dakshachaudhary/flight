const {createUser,createPNRBooking,createInventory,search,updateUser,updateInventory,login,createAdmin,loginAd,getUsers,getInventory,getUsersByPNR} = require("./users.controller")
const router = require("express").Router();
//const{checkToken}=require("../../auth/token_validation");

router.post("/" , createUser);
router.post("/admin" , createAdmin);
router.post("/PNR" , createPNRBooking);
router.post("/inventory" , createInventory);
router.post("/search" , search);
router.patch("/" , updateUser);
router.patch("/inventory" , updateInventory);
router.post("/login" , login);
router.post("/loginAd" , loginAd);
router.get("/" , getUsers);
router.get("/inventory" , getInventory);

module.exports = router;