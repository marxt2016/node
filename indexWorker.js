const worker_threads = require("worker_threads");

const generatePassword = (size) => {
  return new Promise((resolve, reject) => {
    const worker = new worker_threads.Worker("./worker.js", { workerData: size });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
};
(async () => {
  const passwordBytesSize = 4;
  const password = await generatePassword(passwordBytesSize);
  console.log(password);
})();
