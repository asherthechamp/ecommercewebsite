"use server";
import db from "@/db/db";
import fs from "fs/promises";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteUser(id: string) {
  const user = await db.user.delete({ where: { id } });
  if (user === null) return notFound();

  revalidatePath("/");
  revalidatePath("/users");
}
