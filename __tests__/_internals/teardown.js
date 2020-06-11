module.exports = async () => {
  await __MONGOD__.stop();

  process.exit(0);
};
