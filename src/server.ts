import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import seedSuperAdmin from './app/db';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    await seedSuperAdmin();

    app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
