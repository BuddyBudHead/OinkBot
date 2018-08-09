var methods = {};

methods.oink = function(voiceChannel, message) {

    if (!voiceChannel) return channel.send('Du musst schon im Call sein, um dir das Oinken zu gönnen.');

    const permissions = voiceChannel.permissionsFor(message.client.user);

    if (!permissions.has('CONNECT')) {
        return channel.send('Ich darf mich nicht zum Voicechannel verbinden :c');
    }
    if (!permissions.has('SPEAK')) {
        return channel.send('Ich habe nicht die Erlaubis zu sprechen :c');
     }

     voiceChannel.join().then(connection =>{
         const dispatcher = connection.playFile('./floink.mp3');

         dispatcher.on('end', end => {
             voiceChannel.leave();
         });
     }).catch(err => console.log(err));

}

exports.data = methods;