const sql = require("../database/database");

exports.createUser =  (userData, result) => {
    console.log(userData)
    sql.query("INSERT INTO users SET ?", userData, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, email:userData.email,mobileNo:userData.mobileNo });
    });
};

exports.checkUserExit = (email,mobileNo,result) => {
    sql.query(`Select * from users where email='${email}' || mobileNo=${mobileNo}`,(err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length==0) result(null, false);
        else result(null, true);
    })
}
exports.authenticateUser = (userName,password,result) => {
    sql.query(`Select * from users where (email='${userName}' && pass='${password}' )  || (mobileNo='${userName}' && pass='${password}' )`,(err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res && res.length==0){
            result(null,"failed"); 
        }else result(null,"success");
    })
}

exports.resetPassword = (password,email,result) => {
    sql.query(
        "UPDATE users SET pass = ? WHERE email = ?",
        [password, email],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                  result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated customer: ", { update : true });
            result(null, { update : true});
        }
    );
}