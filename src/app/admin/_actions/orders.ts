"use server";
import db from "@/db/db";
import fs from "fs/promises";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteOrder(id: string) {
  const user = await db.order.delete({ where: { id } });
  if (user === null) return notFound();

  revalidatePath("/");
  revalidatePath("/orders");
}
