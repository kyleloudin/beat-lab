<template>
  <h1>This is a Drum</h1>
  <input v-on:keyup.enter="playSound()" />
</template>

<script>
export default {
data(){
    return {

        sounds: [
            {
                title: 'snare',
                sound: 'snare.wav',
                key: 'k'
            }
        ]
    };
},
methods: {

    playSound(){
        
        let audio = new Audio(require('../assets/kick.wav'))
        audio.play();
        
    },

    test(){
        return alert('test')
    }

}


}
</script>

<style>

</style>