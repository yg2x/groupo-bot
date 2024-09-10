import { Message, ChannelType, DMChannel } from 'discord.js';
import { sendMessageToGroup } from '../services/groupSys';
import { handlePrefixCommand } from '../handlers/Command';
import config from '../config.json';

module.exports = {
  name: 'messageCreate',
  async execute(message: Message) {
    if (message.author.bot) return;

    if (message.channel.type === ChannelType.DM) {
      const success = await sendMessageToGroup(message);
      
      if (message.channel instanceof DMChannel) {
        if (success) {
          message.channel.send('Mensagem enviada para o grupo ✅');
        } else {
          message.channel.send('Você não está no grupo ❌');
        }
      }
    }

    if (message.content.startsWith(config.prefix)) {
      handlePrefixCommand(message);
    }
  }
};