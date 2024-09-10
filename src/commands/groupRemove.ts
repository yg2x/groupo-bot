import { Message, TextChannel, DMChannel } from 'discord.js';
import { removeUserFromGroup } from '../services/groupSys';

export async function execute(message: Message, args: string[]) {
  const member = message.mentions.users.first();
  
  if (message.channel instanceof TextChannel || message.channel instanceof DMChannel) {
    if (!member) {
      return message.channel.send('Mencione um usuário ❌');
    }

    const removed = await removeUserFromGroup(member, message.author);
    if (removed) {
      message.channel.send(`${member.tag} foi removido do grupo ✅`);
    } else {
      message.channel.send(`${member.tag} não está no grupo ❌`);
    }
  } else {
    console.log('O canal de texto não suporta o envio de mensagens ❌');
  }
}