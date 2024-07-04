// resolvers.js
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
        `SELECT c.c_id, c.ClinicName, c.Address, c.City FROM Clinic c
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
  },
};

export default resolvers;
