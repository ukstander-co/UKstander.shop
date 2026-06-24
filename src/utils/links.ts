export function getUkAffiliateLink(link: string | null | undefined): string {
  if (!link) return "#";
  if (link.includes("amazon.com")) {
    return link.replace("amazon.com", "amazon.co.uk");
  }
  return link;
}
