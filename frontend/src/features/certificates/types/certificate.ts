export interface Certificate {
  id: string;
  user_id: string;
  title: string;
  issuer: string;
  issue_date: string;
  expiration_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  display_order: number;
}
