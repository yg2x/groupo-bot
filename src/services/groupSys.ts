import { User, Message } from 'discord.js';
import * as fs from 'fs';
import path from 'path';
import dbData from '../db.json';

interface Database {
  users: string[];
}

const db: Database = dbData;

export async function addUserToGroup(user: User, author: User): Promise<boolean> {
  if (db.users.includes(user.id)) {
    return false;
  }

  db.users.push(user.id);
  saveDatabase();

  user.createDM().then(dm => {
    dm.send(`Você foi adicionado ao grupo por **${author.tag}** ✅`);
  });

  return true;
}

export async function removeUserFromGroup(user: User, author: User): Promise<boolean> {
  if (!db.users.includes(user.id)) {
    return false;
  }

  db.users = db.users.filter((userId: string) => userId !== user.id);
  saveDatabase();

  user.createDM().then(dm => {
    dm.send(`Você foi removido do grupo por **${author.tag}** 😔`);
  });

  return true;
}

export async function sendMessageToGroup(message: Message): Promise<boolean> {
  if (!db.users.includes(message.author.id)) {
    return false;
  }

  for (const userId of db.users) {
    if (userId === message.author.id) continue;

    try {
      const user = await message.client.users.fetch(userId);
      if (user) {
        const dm = await user.createDM();
        await dm.send(`Mensagem de **${message.author.username}**: ${message.content}`);
      }
    } catch (error) {
      console.error(`Não foi possível enviar uma mensagem para o usuário (${userId}):`, error);
    }
  }

  return true;
}

function saveDatabase(): void {
  const dbPath = path.join(__dirname, '../db.json');
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}
