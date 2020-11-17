const User = require("../model/authenticatorModel");
let nodemailer = require("nodemailer");

exports.createUser = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      status: false,
      message: "Content can't be empty",
    });
    return;
  }
  if (
    !req.body.email ||
    !req.body.mobileNo ||
    !req.body.password ||
    !req.body.confirmPassword
  ) {
    res.status(400).json({
      status: false,
      message: "All fields are required",
    });
    return;
  }
  const userData = {
    mobileNo: req.body.mobileNo,
    pass: req.body.password,
    email: req.body.email,
  };
  User.checkUserExit(userData.email, userData.mobileNo, (err, isUserExit) => {
    if (err) {
      res.status(500).json({
        status: false,
        message: err.message || "Some error occurred",
      });
    }
    if (isUserExit) {
      res.status(400).json({
        status: false,
        message: "Mobile No or email already exit",
      });
    } else {
      User.createUser(userData, (err, data) => {
        if (err)
          res.status(500).json({
            status: false,
            message: err.message || "Some error occurred",
          });
        else {
          res.json({ status: true, data });
        }
      });
    }
  });
};

exports.authenticateUser = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      status: false,
      message: "Content can't be empty",
    });
    return;
  }
  if (!req.body.userName || !req.body.password) {
    res.status(400).json({
      status: false,
      message: "usreName and Password is required",
    });
    return;
  }

  User.authenticateUser(req.body.userName, req.body.password, (err, data) => {
    if (err)
      res.status(500).json({
        status: false,
        message: err.message || "Some error occurred",
      });
    else {
      res.json({ status: true, data });
    }
  });
};

exports.resetPassword = (req, res) => {
  if (!req.body.email) {
    res.status(400).json({
      status: false,
      message: "email is required!",
    });
    return;
  } else {
    let newPass = Math.floor(Math.random() * 90000) + 10000;
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      // true for 465, false for other ports
      host: "mail.gswire.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "gswireco", // generated ethereal user
        pass: "Dp22s1df4Y", // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    transporter.sendMail(
      {
        from: "gswireco@gswire.com", // sender address
        to: req.body.email, // list of receivers
        subject:
          "Your password has been reseted you can use your new Password now", // Subject line
        text: `${newPass}`, // plain text body
      },
      (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: err.message || "Some error occurred",
          });
        } else {
          console.log("Email sent: " + info.response);
          User.resetPassword(newPass,req.body.email, (err, data) => {
            if (err)
              res.status(500).json({
                status: false,
                message: err.message || "Some error occurred",
              });
            else {
              res.json({ status: true, data });
            }
          });
        }
      }
    );

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
};
