import { Message } from 'discord.js';
import config from '../config.json';
import { execute as groupAddExecute } from '../commands/groupAdd';
import { execute as groupRemoveExecute } from '../commands/groupRemove';

export async function handlePrefixCommand(message: Message) {
  if (!config.owners.includes(message.author.id)) {
    return message.reply("Você não tem permissão para executar este comando ❌");
  }

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  if (command === 'group-add') {
    await groupAddExecute(message, args); 
  }

  if (command === 'group-remove') {
    await groupRemoveExecute(message, args);
  }
}