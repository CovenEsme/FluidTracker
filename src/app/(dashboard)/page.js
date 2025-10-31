import { getSessionAndIds } from "../lib/connection";
import DashboardClient from "./DashboardClient";

export default async function Home() {
  var session,
    user_id,
    patient_id = await getSessionAndIds();

  return <DashboardClient user_id={user_id} patient_id={patient_id} />;
}
