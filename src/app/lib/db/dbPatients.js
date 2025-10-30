import connection from "../connection";

const createNewPatient = async (user_id) => {
  const query = `
    INSERT INTO patients (userId, firstName, lastName, createdAt, updatedAt)
    VALUES(?, 'TestFirstName', 'TestLastName', ?, ?);`

  // const currentDate = new Date().toISOString().slice(0, 10);
  const currentDate = new Date().toISOString().split("T")[0];
  const [rows] = await connection.execute(query, [user_id, currentDate, currentDate]);

  return rows;
};

const getPatientIdFromUserId = async (user_id) => {
  const query = "SELECT patientId FROM patients WHERE userId = ?"

  const [rows] = await connection.execute(query, [user_id]);
  return rows;
}

export { createNewPatient, getPatientIdFromUserId };
