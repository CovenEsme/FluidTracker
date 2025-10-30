import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import DashboardClient from "./DashboardClient";

import {
  createNewPatient,
  getPatientIdFromUserId
} from "@/app/lib/db/dbPatients";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Create patient for the new user_id
  const user_id = session.session.userId;
  var result = await getPatientIdFromUserId(user_id);

  // console.log(`patientIds.length: ${result.length}`);

  if (result.length == 0) {
    await createNewPatient(user_id);
    result = await getPatientIdFromUserId(user_id);
  }

  if (result.length > 1) {
    throw new(`User with id '${user_id}' has multiple patients. This is not yet supported.`);
  }

  const patient_id = result[0].patientId;
  console.log(`userId: ${user_id}; patientId: ${patient_id}`);

  return <DashboardClient user_id={user_id} patient_id={patient_id}/>;
}
