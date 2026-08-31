export function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  if (["price","pricing","cost","quote","budget","how much","rates","charges","fee","affordable","expensive","estimate"].some((k) => lower.includes(k))) return "pricing";
  if (["service","services","offer","provide","what do you do","capabilities","solutions","specialize","expertise"].some((k) => lower.includes(k))) return "services";
  if (["job","opportunity","hiring","vacancy","project","work with","looking for","need help","need a","want to build","want to create"].some((k) => lower.includes(k))) return "job";
  if (["partner","partnership","collaborate","collaboration","joint venture","together","alliance","referral"].some((k) => lower.includes(k))) return "partnership";
  return "general";
}
