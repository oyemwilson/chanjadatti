// data/team.js
export const teamMembers = Array.from({ length: 27 }).map((_, i) => ({
  id: i + 1,
  name: "Full Name",
  title: "Job Title",
  image: null, // backend will supply image URL
}));
