import { useEffect, useState } from "react";
import data from "~/data.json";
import { TierSummary } from "~/components/TierSummary";
import { TeamRow } from "~/components/TeamRow";
import type { Assignments, Team, Tier } from "~/types";

const LS_KEY = "tierlist-assignments";

export default function Home() {
  const { teams, tiers } = data as { tournament: string; teams: Team[]; tiers: Tier[] };

  const [assignments, setAssignments] = useState<Assignments>(() =>
    Object.fromEntries(teams.map((t) => [t.id, null]))
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed: Assignments = JSON.parse(saved);
        setAssignments((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(assignments));
  }, [assignments]);

  function handleChange(teamId: number, tierId: string | null) {
    setAssignments((prev) => ({ ...prev, [teamId]: tierId }));
  }

  const sortedTeams = [...teams].sort((a, b) => a.fifaRanking - b.fifaRanking);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-center mb-8 tracking-tight">
        🌍 World Cup Tier List
      </h1>

      <TierSummary tiers={tiers} teams={sortedTeams} assignments={assignments} />

      <table className="w-full border border-gray-200 rounded overflow-hidden text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="py-2 px-3">🏳</th>
            <th className="py-2 px-3">Équipe</th>
            <th className="py-2 px-3">Confédération</th>
            <th className="py-2 px-3">Tier</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team) => (
            <TeamRow
              key={team.id}
              team={team}
              tiers={tiers}
              tierId={assignments[team.id]}
              onChange={handleChange}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
