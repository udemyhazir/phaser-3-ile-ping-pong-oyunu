import Phaser from 'phaser'
import WebFontFile from './WebFontFile'

class TitleScene extends Phaser.Scene{
    preload(){
        this.load.addFile(new WebFontFile(this.load,'Press Start 2P'))

        this.load.audio('pong-peeeeeep','assets/peeeeeep.ogg')
    }

    create(){

            const text=this.add.text(400,200,'Ping Pong Game',{
                fontFamily:'"Press Start 2P"',
                fontSize:40
            })

            text.setOrigin(0.5,0.5)

            this.add.text(400,300,'Başlamak için SPACE Tuşuna Basınız',{
                fontFamily:'"Press Start 2P"',
               
            }).setOrigin(0.5,0.5)

            this.input.keyboard.once('keydown-SPACE',()=>{
                //console.log('SPACE e basıldı');

                this.sound.play('pong-peeeeeep')
                this.scene.start('game')
            })
       
        

    }

    update(){

    }
}


export default TitleScene