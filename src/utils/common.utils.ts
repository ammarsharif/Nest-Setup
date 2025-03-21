import { v4 as uuid } from 'uuid';

export async function generateHash() {
  return uuid();
}
