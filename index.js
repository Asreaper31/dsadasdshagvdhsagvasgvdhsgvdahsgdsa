const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: 'Nzc4NTY0MDI1MTg4NjE0MTQ1.X7T0QA.kGkaDocNjZB_DOIZEmHc5GGv2U0', totalShards: 2  });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}\nWorking....`));