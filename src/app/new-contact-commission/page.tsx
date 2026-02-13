import NewContactCommission from "@/components/NewContactCommission";
import PasswordGate from "@/components/PasswordGate";

export default function NewContactCommissionPage() {
  return (
    <PasswordGate>
      <NewContactCommission />
    </PasswordGate>
  );
}
