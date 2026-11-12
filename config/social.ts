/** Public profile URLs are supplied at deploy time; unset profiles are not rendered. */
export const socialLinks = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
};
