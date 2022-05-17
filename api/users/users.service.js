const pool = require("../../config/database");

module.exports = {
  createUser: (data, callback) => {
    pool.query(
      `INSERT INTO user(id, name, email, password, meal, seat_number, pass_number, seats_booked)
            values(?,?,?,?,?,?,?,?)`,
      [
        data.id,
        data.name,
        data.email,
        data.password,
        data.meal,
        data.seat_number,
        data.pass_number,
        data.seats_booked,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  createPNRBooking: (data, callback) => {
    pool.query(
      `INSERT INTO pnr_booking(id, flight_id, airline, name, pass_number, pnr, from_place, to_place, date, email, status)
            values(?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.id,
        data.flight_id,
        data.airline,
        data.name,
        data.pass_number,
        data.pnr,
        data.from_place,
        data.to_place,
        data.date,
        data.email,
        data.status    
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  createInventory: (data, callback) => {
    pool.query(
      `INSERT INTO inventory(flight_id, airline, from_place, to_place, start, end, scheduledOn, instrument, business_seats, total_business_seats, business_price, 
        non_business_price, row_num, meals, status)
            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.flight_id,
        data.airline,
        data.from_place,
        data.to_place,
        data.start,
        data.end,
        data.scheduledOn,
        data.instrument,
        data.business_seats,
        data.total_business_seats,
        data.business_price,
        data.non_business_price,
        data.row_num,
        data.meals,
        data.status
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  search: (data, callback) => {
    pool.query(
      `SELECT flight_id, airline, end, scheduledOn, instrument, business_seats, total_business_seats, business_price, 
        non_business_price, row_num, meals FROM inventory where  from_place=? and to_place=? and start=? and status=?`,
      [
        data.from_place,
        data.to_place,
        data.start,
        data.status="delayed"
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update user set name=?, email=?, password=?, meal=?, seat_number=?, pass_number=?, seats_booked=? where id = ?`,
      [
        data.name,
        data.email,
        data.password,
        data.meal,
        data.seat_number,
        data.pass_number,
        data.seats_booked,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results.changedRows);
      }
    );
  },
  updateInventory: (data, callBack) => {
    pool.query(
      `update inventory set airline=?, from_place=?, to_place=?, start=?, end=?, scheduledOn=?, instrument=?, business_seats=?, total_business_seats=?, business_price=?, 
      non_business_price=?, row_num=?, meals=?, status=? where flight_id = ?`,
      [
        data.airline,
        data.from_place,
        data.to_place,
        data.start,
        data.end,
        data.scheduledOn,
        data.instrument,
        data.business_seats,
        data.total_business_seats,
        data.business_price,
        data.non_business_price,
        data.row_num,
        data.meals,
        data.status,
        data.flight_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM user WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  createAdmin: (data, callback) => {
    pool.query(
      `INSERT INTO admin(id, name, email, password)
            values(?,?,?,?)`,
      [
        data.id,
        data.name,
        data.email,
        data.password       
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getAdminByAdminEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM admin WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `SELECT * from user`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getInventory: (callBack) => {
    pool.query(
      `SELECT * from inventory`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
}