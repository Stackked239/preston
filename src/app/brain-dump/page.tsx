import ProjectTracker from "@/components/ProjectTracker";
import PasswordGate from "@/components/PasswordGate";

export default function BrainDumpPage() {
  return (
    <PasswordGate>
      <ProjectTracker />
    </PasswordGate>
  );
}
