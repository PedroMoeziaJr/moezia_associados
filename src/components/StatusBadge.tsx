export default function StatusBadge({ status }: { status: string | null }) {
  return (
    <span className="inline-flex items-center rounded-full bg-moezia-red/10 px-4 py-1.5 text-sm font-semibold text-moezia-red">
      {status ?? "Status não informado"}
    </span>
  );
}
