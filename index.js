app.use((req, res, next) => {
  console.log(
    chalk.bgHex("#FFFF99").hex("#333").bold(` Request Route: ${req.path} `)
  );
  global.totalreq += 1;

  const originalJson = res.json;
  res.json = function (data) {
    if (data && typeof data === "object") {
      const responseData = {
        status: typeof data.status !== "undefined" ? data.status : true,
        creator: settings.creator || "Rahardiyan",
        ...data,
      };
      return originalJson.call(this, responseData);
    }
    return originalJson.call(this, data);
  };

  next();
});

// Error handler global
app.use((err, req, res, next) => {
  console.error(chalk.red("Server Error:"), err);
  res.status(500).json({
    status: false,
    message: "Internal Server Error",
  });
});