export const portfolioPageQuery = `*[_id == "portfolioPage"][0]{
  _id,
  tabs,
  projectsSection,
  "projects": projects[]->{
    _id,
    title,
    meta,
    categoryYear,
    description,
    metadata,
    listHeaderLabel,
    results,
    cardGradient,
    cardEmoji
  }
}`;

export const projectByIdQuery = `*[_type == "project" && _id == $id][0]{
  _id,
  title,
  meta,
  categoryYear,
  description,
  metadata,
  listHeaderLabel,
  results,
  cardGradient,
  cardEmoji
}`;
