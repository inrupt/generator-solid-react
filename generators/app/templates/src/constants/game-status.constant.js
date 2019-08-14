/**
 * Object mapping of available game statuses to the display label
 */
export const GameStatus = {
  ALL: 'All',
  INVITESENT: 'Invite Sent',
  MOVEO: 'Move O',
  MOVEX: 'Move X',
  DELETED: 'Deleted',
  DECLINED: 'Declined',
  RESIGNED: 'Resigned',
  FINISHED: 'Finished'
};

/**
 * Array of game status labels
 */
export const GameStatusList = [
  GameStatus.ALL,
  GameStatus.INVITESENT,
  GameStatus.MOVEO,
  GameStatus.MOVEX,
  GameStatus.DECLINED,
  GameStatus.DELETED,
  GameStatus.RESIGNED,
  GameStatus.FINISHED
];
