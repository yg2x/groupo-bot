import { Message, TextChannel, DMChannel } from 'discord.js';
import { addUserToGroup } from '../services/groupSys';

export async function execute(message: Message, args: string[]) {
  const member = message.mentions.users.first();
  
  if (message.channel instanceof TextChannel || message.channel instanceof DMChannel) {
    if (!member) {
      return message.channel.send('Mencione um usuário ❌');
    }

    const added = await addUserToGroup(member, message.author);
    if (added) {
      message.channel.send(`${member.tag} foi adicionado ao grupo ✅`);
    } else {
      message.channel.send(`${member.tag} já está no grupo ❌`);
    }
  } else {
    console.log('O canal de texto não suporta o envio de mensagens ❌');
  }
}