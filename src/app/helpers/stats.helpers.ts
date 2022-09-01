import { IMatchStat } from '../models/match-stat';
import { IPlayerStats } from '../models/player-stats';

// FUNCTIONS TO DISPLAY THE STATISTICS

export function getAcesStatsPlayer(allPlayerStats: IPlayerStats[]): IMatchStat {
  return {
    statName: 'Aces',
    statPlayers: allPlayerStats.map((playerStat) => {
      const otherStatPlayer = getOtherPlayerStat(allPlayerStats, playerStat);
      return {
        displayedData: playerStat.acesCount.toString(),
        percentageOfTotal: getPercentage(
          playerStat.acesCount,
          playerStat.acesCount + otherStatPlayer.acesCount
        ),
      };
    }),
  };
}

export function getFirstServesStatsPlayer(
  allPlayerStats: IPlayerStats[]
): IMatchStat {
  return {
    statName: '1st Serve %',
    statPlayers: allPlayerStats.map((playerStat) => {
      const otherStatPlayer = getOtherPlayerStat(allPlayerStats, playerStat);

      return {
        displayedData: `${getPercentage(
          playerStat.firstServesCount,
          playerStat.totalServedPointsCount
        )}%`,
        percentageOfTotal: getPercentage(
          getPercentage(
            playerStat.firstServesCount,
            playerStat.totalServedPointsCount
          ),
          getPercentage(
            playerStat.firstServesCount,
            playerStat.totalServedPointsCount
          ) +
            getPercentage(
              otherStatPlayer.firstServesCount,
              otherStatPlayer.totalServedPointsCount
            )
        ),
      };
    }),
  };
}

export function getDoubleFaultsStatsPlayer(
  allPlayerStats: IPlayerStats[]
): IMatchStat {
  return {
    statName: 'Double Faults',
    statPlayers: allPlayerStats.map((playerStat) => {
      const otherStatPlayer = getOtherPlayerStat(allPlayerStats, playerStat);
      return {
        displayedData: playerStat.doubleFaultsCount.toString(),
        percentageOfTotal: getPercentage(
          playerStat.doubleFaultsCount,
          playerStat.doubleFaultsCount + otherStatPlayer.doubleFaultsCount
        ),
      };
    }),
  };
}

export function getWinOnFirstServesStatsPlayer(
  allPlayerStats: IPlayerStats[]
): IMatchStat {
  return {
    statName: 'Win % on 1st Serve %',
    statPlayers: allPlayerStats.map((playerStat) => {
      const otherStatPlayer = getOtherPlayerStat(allPlayerStats, playerStat);

      return {
        displayedData: `${getPercentage(
          playerStat.wonFirstServesCount,
          playerStat.firstServesCount
        )}%`,
        percentageOfTotal: getPercentage(
          getPercentage(
            playerStat.wonFirstServesCount,
            playerStat.firstServesCount
          ),
          getPercentage(
            playerStat.wonFirstServesCount,
            playerStat.firstServesCount
          ) +
            getPercentage(
              otherStatPlayer.wonFirstServesCount,
              otherStatPlayer.firstServesCount
            )
        ),
      };
    }),
  };
}

export function getWinOnSecondServesStatsPlayer(
  allPlayerStats: IPlayerStats[]
): IMatchStat {
  return {
    statName: 'Win % on 2nd Serve %',
    statPlayers: allPlayerStats.map((playerStat) => {
      const otherStatPlayer = getOtherPlayerStat(allPlayerStats, playerStat);
      const secondServesCount: number = getSecondServesCount(playerStat);

      return {
        displayedData: `${getPercentage(
          playerStat.wonSecondServesCount,
          secondServesCount
        )}%`,
        percentageOfTotal: getPercentage(
          getPercentage(playerStat.wonSecondServesCount, secondServesCount),
          getPercentage(playerStat.wonSecondServesCount, secondServesCount) +
            getPercentage(
              otherStatPlayer.wonSecondServesCount,
              getSecondServesCount(otherStatPlayer)
            )
        ),
      };
    }),
  };
}

export function getPointsWonStatsPlayer(
  allPlayerStats: IPlayerStats[]
): IMatchStat {
  return {
    statName: 'Points Won',
    statPlayers: allPlayerStats.map((playerStat) => {
      const otherStatPlayer = getOtherPlayerStat(allPlayerStats, playerStat);
      return {
        displayedData: playerStat.wonPointsCount.toString(),
        percentageOfTotal: getPercentage(
          playerStat.wonPointsCount,
          playerStat.wonPointsCount + otherStatPlayer.wonPointsCount
        ),
      };
    }),
  };
}

export function getReceivingPointsWonStatsPlayer(
  allPlayerStats: IPlayerStats[]
): IMatchStat {
  return {
    statName: 'Receiving Points Won %',
    statPlayers: allPlayerStats.map((playerStat) => {
      const otherPlayerStat = getOtherPlayerStat(allPlayerStats, playerStat);
      const receivedPointsCount: number = getReceivedPointsCount(
        allPlayerStats,
        playerStat
      );

      return {
        displayedData: `${getPercentage(
          playerStat.wonReceivingPointsCount,
          receivedPointsCount
        )}%`,
        percentageOfTotal: getPercentage(
          getPercentage(
            playerStat.wonReceivingPointsCount,
            receivedPointsCount
          ),
          getPercentage(
            playerStat.wonReceivingPointsCount,
            receivedPointsCount
          ) +
            getPercentage(
              otherPlayerStat.wonReceivingPointsCount,
              getReceivedPointsCount(allPlayerStats, otherPlayerStat)
            )
        ),
      };
    }),
  };
}

export function getWinnersStatsPlayer(
  initialStats: IPlayerStats[]
): IMatchStat {
  return {
    statName: 'Winners',
    statPlayers: initialStats.map((playerStat) => {
      const otherStatPlayer = getOtherPlayerStat(initialStats, playerStat);
      return {
        displayedData: playerStat.winnerPointsCount.toString(),
        percentageOfTotal: getPercentage(
          playerStat.winnerPointsCount,
          playerStat.winnerPointsCount + otherStatPlayer.winnerPointsCount
        ),
      };
    }),
  };
}

export function getForcedErrorsStatsPlayer(
  initialStats: IPlayerStats[]
): IMatchStat {
  return {
    statName: 'Forced Errors',
    statPlayers: initialStats.map((playerStat) => {
      const otherStatPlayer = getOtherPlayerStat(initialStats, playerStat);
      return {
        displayedData: playerStat.forcedErrorsCount.toString(),
        percentageOfTotal: getPercentage(
          playerStat.forcedErrorsCount,
          playerStat.forcedErrorsCount + otherStatPlayer.forcedErrorsCount
        ),
      };
    }),
  };
}

export function getUnforcedErrorsStatsPlayer(
  initialStats: IPlayerStats[]
): IMatchStat {
  return {
    statName: 'Unforced Errors',
    statPlayers: initialStats.map((playerStat) => {
      const otherStatPlayer = getOtherPlayerStat(initialStats, playerStat);
      return {
        displayedData: playerStat.unforcedErrorsCount.toString(),
        percentageOfTotal: getPercentage(
          playerStat.unforcedErrorsCount,
          playerStat.unforcedErrorsCount + otherStatPlayer.unforcedErrorsCount
        ),
      };
    }),
  };
}

export function getBreakPointsStatsPlayer(
  initialStats: IPlayerStats[]
): IMatchStat {
  return {
    statName: 'Break Points',
    statPlayers: initialStats.map((playerStat) => {
      const otherStatPlayer = getOtherPlayerStat(initialStats, playerStat);
      return {
        displayedData: playerStat.totalBreakPointsCount.toString(),
        percentageOfTotal: getPercentage(
          playerStat.totalBreakPointsCount,
          playerStat.totalBreakPointsCount +
            otherStatPlayer.totalBreakPointsCount
        ),
      };
    }),
  };
}

export function getBreakPointsConversionsStatsPlayer(
  allPlayerStats: IPlayerStats[]
): IMatchStat {
  return {
    statName: 'Break Points Conversion %',
    statPlayers: allPlayerStats.map((playerStat) => {
      const otherPlayerStat = getOtherPlayerStat(allPlayerStats, playerStat);
      return {
        displayedData: `${getPercentage(
          playerStat.breakPointConversionsCount,
          playerStat.playedBreakPointsCount
        )}%`,
        percentageOfTotal: getPercentage(
          getPercentage(
            playerStat.breakPointConversionsCount,
            playerStat.playedBreakPointsCount
          ),
          getPercentage(
            playerStat.breakPointConversionsCount,
            playerStat.playedBreakPointsCount
          ) +
            getPercentage(
              otherPlayerStat.breakPointConversionsCount,
              otherPlayerStat.playedBreakPointsCount
            )
        ),
      };
    }),
  };
}

// OTHER FUNCTIONS CALLED TO HELP THE FUNCTIONS ABOVE

export function getOtherPlayerStat(
  allPlayerStats: IPlayerStats[],
  playerStat: IPlayerStats
): IPlayerStats {
  return allPlayerStats.find((ps) => {
    return ps.player.id !== playerStat.player.id;
  });
}

export function getPercentage(value: number, total: number): number {
  if (total === 0) {
    return 0;
  }
  return Math.round((value / total) * 100);
}

export function getSecondServesCount(playerStats: IPlayerStats): number {
  return (
    playerStats.totalServedPointsCount -
    playerStats.firstServesCount -
    playerStats.doubleFaultsCount
  );
}

export function getReceivedPointsCount(
  allPlayerStats: IPlayerStats[],
  playerStat: IPlayerStats
): number {
  const pointsCount: number = allPlayerStats
    .map((playerStat) => {
      return playerStat.wonPointsCount;
    })
    .reduce((player1win, player2win) => {
      return player1win + player2win;
    });

  return pointsCount - playerStat.totalServedPointsCount;
}
