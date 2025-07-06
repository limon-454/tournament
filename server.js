app.get("/matches", (req, res) => {
  res.json([
    {
      _id: "1",
      title: "Solo Match Example",
      prize: 500,
      entry: 10,
      type: "Solo",
      date: "2025-07-06 08:00 PM"
    },
    {
      _id: "2",
      title: "Duo Match Example",
      prize: 1000,
      entry: 20,
      type: "Duo",
      date: "2025-07-06 08:20 PM"
    }
  ]);
});
