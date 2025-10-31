import mysql from "mysql2/promise";

import { getOrCreatePatientId } from "./db/dbPatients";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  timezone: "Z", // Important to ensure UTC timezone
});

const getSession = async() => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session;
}

const getSessionAndIds = async() => {
  const session = await getSession();
  const user_id = session.session.userId;
  const patient_id = await getOrCreatePatientId(user_id);

  return (session, user_id, patient_id);
}

export { connection, getSession, getSessionAndIds };
