// resolvers.js
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import crypto from "crypto";
const resolvers = {
  Query: {
    //working correct
    doctors: async (_, __, { pool }) => {
      const [rows] = await pool.query("SELECT * FROM Doctor");
      console.log("ROWS", rows);
      return rows.map((row) => ({
        id: row.d_id,
        name: row.d_name,
        fee: row.d_fee,
        experience: row.d_experience,
        profile_img: row.profile_img,
      }));
    },
    doctorById: async (_, { id }, { pool }) => {
      const [rows] = await pool.query(`SELECT * FROM Doctor WHERE d_id=?;`, [
        id,
      ]);
      // console.log(rows[0]);
      return {
        id: rows[0].d_id,
        name: rows[0].d_name,
        fee: rows[0].d_fee,
        experience: rows[0].d_experience,
        profile_img: rows[0].profile_img,
      };
    },
    doctorByName: async (_, { name }, { pool }) => {
      const [rows] = await pool.query(
        `SELECT * FROM Doctor
                                       WHERE
        CASE
            WHEN LENGTH(TRIM(?)) <3 THEN 0
            ELSE d_name LIKE ?
        END;`,
        [name, `%${name}%`]
      );
      console.log("Rows", rows);
      return rows.map((row) => ({
        id: row.d_id,
        name: row.d_name,
        fee: row.d_fee,
        experience: row.d_experience,
        profile_img: row.profile_img,
      }));
    },
    doctorBySpecialities: async (
      _,
      { speciality, limit, offset },
      { pool }
    ) => {
      const [rows] = await pool.query(
        `SELECT d.d_id,d.d_name,d.d_fee,d.d_experience,d.profile_img,s.spec_name
                                         FROM Doctor d
                                         JOIN Spec_Doct_mapping sd ON d.d_id = sd.d_id
                                         JOIN Specialization s ON sd.s_id = s.spec_id
                                         WHERE s.spec_name LIKE ?
                                        
                                         ;`,
        [`%${speciality}%`]
      );
      console.log("Rows", rows);
      return rows.map((row) => ({
        id: row.d_id,
        name: row.d_name,
        fee: row.d_fee,
        experience: row.d_experience,
        profile_img: row.profile_img,
        specialization: row.spec_name,
      }));
    },
    specialities: async (_, { name }, { pool }) => {
      const [rows] = await pool.query(
        `SELECT * FROM Specialization WHERE
        CASE
            WHEN LENGTH(TRIM(?)) <3 THEN 0
            ELSE spec_name LIKE ?
        END;`,
        [name, `%${name}%`]
      );
      console.log("Rows", rows);
      return rows.map((row) => ({
        id: row.spec_id,
        name: row.spec_name,
      }));
    },

    clinicsByDocId: async (_, { id }, { pool }) => {
      const [rows] = await pool.query(
        `SELECT c.c_id, c.ClinicName, c.Address, c.City, dc.start_time, dc.end_time FROM Clinic c
          JOIN doc_clin_mapping dc ON c.c_id =  dc.clinic_id
          WHERE dc.doct_id = ?`,
        [id]
      );
      console.log(rows);

      return rows.map((row) => ({
        id: row.c_id,
        name: row.ClinicName,
        address: row.Address,
        city: row.City,
        start_time: row.start_time,
        end_time: row.end_time,
      }));
    },
    specialityByDocId: async (_, { id }, { pool }) => {
      const [rows] = await pool.query(
        `SELECT s.spec_id, s.spec_name FROM Specialization s
          JOIN Spec_Doct_mapping ds ON s.spec_id =  ds.s_id
          WHERE ds.d_id = ?`,
        [id]
      );
      console.log(rows);

      return rows.map((row) => ({
        id: row.spec_id,
        name: row.spec_name,
      }));
    },
    appointmentByDocIdAndClinicId: async (
      _,
      { doc_id, clinic_id },
      { pool }
    ) => {
      const [appointments] = await pool.query(
        `SELECT t.doc_id, t.pat_id, t.clinic_id, t.slot_start_time, t.doc_pat_id FROM doc_pat_mapping t
        WHERE t.doc_id=? AND t.clinic_id=?`,
        [doc_id, clinic_id]
      );

      console.log("APPOINTMENTS", appointments);

      return appointments.map((row) => ({
        id: row.doc_pat_id,
        doc_id: row.doc_id,
        pat_id: row.pat_id,
        clinic_id: row.clinic_id,
        start_time: row.slot_start_time,
      }));
    },
    appointmentsByPatId: async (
      _,
      { pat_id },
      { pool }
    ) => {
      const [appointments] = await pool.query(
        `SELECT a.doc_pat_id, a.pat_id, a.slot_start_time, d.d_id as doc_id, d.d_name as doc_name,
                  d.d_experience, d.d_fee, c.c_id as clinic_id, c.ClinicName as clinic_name, d.profile_img,
                  c.Address, c.City
           FROM doc_pat_mapping a
           JOIN Doctor d ON a.doc_id = d.d_id
           JOIN Clinic c ON a.clinic_id = c.c_id
           WHERE a.pat_id = ?`,
        [pat_id]
      );

      console.log("APPOINTMENTS", appointments);

      return appointments.map((row) => ({
        id: row.doc_pat_id,
        doc_id: row.doc_id,
        pat_id: row.pat_id,
        clinic_id: row.clinic_id,
        start_time: row.slot_start_time,
        doc_name:row.doc_name,
        clinic_address:row.Address,
        clinic_city:row.City,
        doc_fee:row.d_fee,
        clinic_name:row.clinic_name,
        doc_experience:row.d_experience,
        doc_profile:row.profile_img
      }));
    },
  },
  Mutation: {
    addUser: async (
      _,
      { name, email, password, confirmPassword },
      { pool }
    ) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (password !== confirmPassword) {
        throw new Error("Password didn't match");
      }
      if (!email.match(regex)) {
        throw new Error("Email is not valid");
      }

      const [existingUser] = await pool.query(
        `SELECT p.email FROM Patient p
        WHERE p.email=?`,
        [email]
      );
      if (existingUser.length > 0) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcryptjs.hash(password, 10);
      console.log("existing user", existingUser);

      const [AddedUser] = await pool.query(
        `INSERT INTO Patient (p_name,email,password) VALUES (?, ?, ?);`,
        [name, email, hashedPassword]
      );

      console.log("ADDED USER", AddedUser);
      return {
        id: AddedUser.insertId,
        name: name,
        email: email,
      };
    },
    loginUser: async (_, { email, password }, { pool }) => {
      const [existingUser] = await pool.query(
        `SELECT p.email, p.p_id, p.p_name, p.password FROM Patient p
        WHERE p.email=?`,
        [email]
      );
      if (existingUser.length == 0) {
        throw new Error("User not registered");
      }
      console.log("EXISTING USER", existingUser[0]);
      const isPasswordMatched = await bcryptjs.compare(
        password,
        existingUser[0].password
      );
      console.log("existing user", existingUser);

      if (!isPasswordMatched) {
        throw new Error("Password is not correct");
      }
      const payload = {
        id: existingUser[0]._id,
      };

      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return {
        id: existingUser[0].p_id,
        name: existingUser[0].p_name,
        email: existingUser[0].email,
        token: token,
      };
    },
    createOrder: async (_, { amount }, { pool }) => {
      var options = {
        amount: amount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
      };

      try {
        const instance = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const paymentResponse = await instance.orders.create(options);
        console.log("instance", paymentResponse);
        return {
          id: paymentResponse.id,
          currency: paymentResponse.currency,
          amount: paymentResponse.amount,
          receipt: paymentResponse.receipt,
          status: paymentResponse.status,
          success: true,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    verifyPayment: async (
      _,
      { razorpay_order_id, razorpay_payment_id, razorpay_signature }
    ) => {
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature === razorpay_signature) {
        // Add your business logic here (e.g., enroll student, update database, etc.)
        return { success: true, message: "Payment Verified" };
      }

      return { success: false, message: "Payment Failed" };
    },
    addAppointment: async (
      _,
      { doc_id, pat_id, clinic_id, start_time },
      { pool }
    ) => {
      const [existingAppointment] = await pool.query(
        `SELECT * FROM doc_pat_mapping WHERE doc_id=? AND clinic_id=? AND slot_start_time=?`,
        [doc_id, clinic_id, start_time]
      );
      if (existingAppointment.length > 0) {
        throw new Error("Slot is already booked by other patient");
      }

      const [addedAppointment] = await pool.query(
        `INSERT INTO doc_pat_mapping (doc_id,pat_id,clinic_id, slot_start_time) VALUES (?, ?, ?,?);`,
        [doc_id, pat_id, clinic_id, start_time]
      );
      return {
        id: addedAppointment.insertId,
        doc_id: doc_id,
        pat_id: pat_id,
        clinic_id: clinic_id,
        start_time: start_time,
        success: true,
      };
    },
    appointmentByDocIdAndClinicId: async (
      _,
      { doc_id, clinic_id },
      { pool }
    ) => {
      const [appointments] = await pool.query(
        `SELECT t.doc_id, t.pat_id, t.clinic_id, t.slot_start_time, t.doc_pat_id FROM doc_pat_mapping t
        WHERE t.doc_id=? AND t.clinic_id=?`,
        [doc_id, clinic_id]
      );

      console.log("APPOINTMENTS", appointments);

      return appointments.map((row) => ({
        id: row.doc_pat_id,
        doc_id: row.doc_id,
        pat_id: row.pat_id,
        clinic_id: row.clinic_id,
        start_time: row.slot_start_time,
      }));
    },
    
  },
};

export default resolvers;
