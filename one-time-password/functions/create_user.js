module.exports = (req, res) => {
  // req.body holds parameters that are sent from the client
  // res.send is basically sending a response back to whoever requested eg client
  res.send(req.body);
}
