const createMatch = (user_id, matched_to) => ({
  user_id,
  matched_to,
  date_matched: new Date().toISOString(),
});

module.exports = createMatch;
