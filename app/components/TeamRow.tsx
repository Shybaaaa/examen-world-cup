import type { Team, Tier } from "~/types";

type Props = {
  team: Team;
  tiers: Tier[];
  tierId: string | null;
  onChange: (teamId: number, tierId: string | null) => void;
};

export function TeamRow({ team, tiers, tierId, onChange }: Props) {
  const selectedTier = tiers.find((t) => t.id === tierId);

  return (
    <tr className="border-b border-gray-200">
      <td className="py-2 px-3">
        <img
          src={`https://flagcdn.com/w40/${team.code}.png`}
          alt={team.name}
          width={28}
          height={20}
          className="rounded-sm"
        />
      </td>
      <td className="py-2 px-3 font-medium">{team.name}</td>
      <td className="py-2 px-3 text-sm text-gray-500">{team.confederation}</td>
      <td className="py-2 px-3">
        <select
          value={tierId ?? ""}
          onChange={(e) =>
            onChange(team.id, e.target.value === "" ? null : e.target.value)
          }
          style={{ backgroundColor: selectedTier?.color ?? "#ffffff" }}
          className="border border-gray-300 rounded px-2 py-1 text-sm font-semibold cursor-pointer"
        >
          <option value="">— Non classé —</option>
          {tiers.map((tier) => (
            <option key={tier.id} value={tier.id}>
              {tier.label}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}
