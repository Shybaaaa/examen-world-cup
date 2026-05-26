import type { Team, Tier, Assignments } from "~/types";

type Props = {
  tiers: Tier[];
  teams: Team[];
  assignments: Assignments;
};

export function TierSummary({ tiers, teams, assignments }: Props) {
  return (
    <div className="flex flex-col gap-1 mb-8">
      {tiers.map((tier) => {
        const assignedTeams = teams.filter(
          (t) => assignments[t.id] === tier.id
        );
        return (
          <div
            key={tier.id}
            className="flex items-center gap-3 rounded px-3 py-2 min-h-[48px]"
            style={{ backgroundColor: tier.color }}
          >
            <span className="font-black text-lg w-6 text-center shrink-0">
              {tier.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {assignedTeams.length === 0 ? (
                <span className="text-sm text-gray-400 italic">
                  Aucune équipe
                </span>
              ) : (
                assignedTeams.map((team) => (
                  <div
                    key={team.id}
                    className="flex items-center gap-1 bg-white/60 rounded px-2 py-0.5 text-sm"
                  >
                    <img
                      src={`https://flagcdn.com/w40/${team.code}.png`}
                      alt={team.name}
                      width={20}
                      height={14}
                      className="rounded-sm"
                    />
                    <span>{team.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
