import { connection } from "../connection";

const createNewPatient = async (user_id) => {
  const query = `
    INSERT INTO patients (userId, firstName, lastName, createdAt, updatedAt)
    VALUES(?, 'TestFirstName', 'TestLastName', ?, ?);`;

  const currentDate = new Date().toISOString().split("T")[0];
  const [rows] = await connection.execute(query, [
    user_id,
    currentDate,
    currentDate,
  ]);

  return rows;
};

const getPatientIdFromUserId = async (user_id) => {
  const query = "SELECT patientId FROM patients WHERE userId = ?";

  const [rows] = await connection.execute(query, [user_id]);
  return rows;
};

const getOrCreatePatientId = async (user_id) => {
  var result = await getPatientIdFromUserId(user_id);

  // console.log(`patientIds.length: ${result.length}`);

  if (result.length == 0) {
    await createNewPatient(user_id);
    result = await getPatientIdFromUserId(user_id);
  }

  if (result.length > 1) {
    throw new `User with id '${user_id}' has multiple patients. This is not yet supported.`();
  }

  const patient_id = result[0].patientId;
  console.log(`userId: ${user_id}; patientId: ${patient_id}`);

  return patient_id;
};

export { createNewPatient, getPatientIdFromUserId, getOrCreatePatientId };
