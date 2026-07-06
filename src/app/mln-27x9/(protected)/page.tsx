import { redirect } from "next/navigation";
import { ADMIN_BASE_PATH } from "@/lib/constants";

export default function AdminHomePage() {
  redirect(`${ADMIN_BASE_PATH}/perfil`);
}
