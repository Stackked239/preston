import TimeClockAdmin from "@/components/TimeClockAdmin";
import PasswordGate from "@/components/PasswordGate";

export default function TimeClockAdminPage() {
  return (
    <PasswordGate>
      <TimeClockAdmin />
    </PasswordGate>
  );
}
