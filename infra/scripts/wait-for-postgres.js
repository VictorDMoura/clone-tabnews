const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleRerturn);

  function handleRerturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      checkPostgres();
      process.stdout.write(".");
      return;
    }

    console.log("\n🟢 Postgres está pronto e aceitando conexões!\n");
  }
}

process.stdout.write("\n\n🔴 Aguardando Postgress aceitar conexões");
checkPostgres();
