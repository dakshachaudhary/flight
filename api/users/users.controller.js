const {createUser,createPNRBooking,createInventory,search,updateUser,updateInventory,getUserByUserEmail,createAdmin,getAdminByAdminEmail,getUsers,getInventory} = require("./users.service");
  const { genSaltSync, hashSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");
  module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      createUser(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Db connection error",
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
        });
      });
    },
    createPNRBooking: (req, res) => {
        const body = req.body;
        createPNRBooking(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Db connection error",
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      },
      createInventory: (req, res) => {
        const body = req.body;
        createInventory(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Db connection error",
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      },
      search: (req, res) => {
        const body = req.body;
        search(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Db connection error",
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      },
      updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "record not found",
            });
          }
          return res.json({
            success: 1,
            message: "user updated sucessfully",
          });
        });
      },
      updateInventory: (req, res) => {
        const body = req.body;
        updateInventory(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "record not found",
            });
          }
          return res.json({
            success: 1,
            message: "inventory updated sucessfully",
          });
        });
      },
  createAdmin: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createAdmin(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Db connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
      login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
          if (err) {
            console.log(err);
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "Invalid email or password",
            });
          }
          const result = compareSync(body.password, results.password);
          if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "qwe1234", {
              expiresIn: "1h",
            });
            return res.json({
              success: 1,
              message: "Login sucessful",
              token: jsontoken,
            });
          } else {
            return res.json({
              success: 0,
              message: "Invalid email or password",
            });
          }
        });
      },
  loginAd: (req, res) => {
    const body = req.body;
    getAdminByAdminEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Invalid email, password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "Login sucessful",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          message: "Invalid email or password",
        });
      }
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        sucess: 1,
        data: results,
      });
    });
  },
  getInventory: (req, res) => {
    getInventory((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        sucess: 1,
        data: results,
      });
    });
  },
}