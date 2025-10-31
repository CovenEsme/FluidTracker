import { connection } from "../connection";

const getCurrentFluidTarget = async (user_id, patient_id) => {
  const query =
    "SELECT millilitres FROM fluidTargets WHERE userId = ? AND patientId = ? ORDER BY createdAt DESC LIMIT 1";

  const [rows] = await connection.execute(query, [user_id, patient_id]);
  return rows;
};

const setNewFluidTarget = async (user_id, patient_id, newTarget) => {
  const query = `
    INSERT INTO fluidTargets (patientId, userId, createdAt, millilitres)
    VALUES (?, ?, ?, ?)`;

  const currentDate = new Date().toISOString().split("T")[0];
  const [rows] = await connection.execute(query, [
    patient_id,
    user_id,
    currentDate,
    newTarget,
  ]);

  return rows;
};

export { getCurrentFluidTarget, setNewFluidTarget };
