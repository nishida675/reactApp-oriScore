export type Participant = {
  tournamentId: number;
  participantId: number;
  classId: number;
  participantName: string;
  className: string;
  affiliation: string;
  reregistration: boolean;
  number: string | number;
  resultNotFound: string | number;
  preResultNotFound: string | number;
  Check: string | number;
};