import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import DashboardClient from "./DashboardClient";

import {
  getOrCreatePatientId
} from "@/app/lib/db/dbPatients";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user_id = session.session.userId;
  const patient_id = await getOrCreatePatientId(user_id);

  return <DashboardClient user_id={user_id} patient_id={patient_id}/>;
}
